package at.waecm.backend.controller;

import at.waecm.backend.Service.UserService;
import at.waecm.backend.dto.ChargeInfoDataDto;
import at.waecm.backend.dto.ChargeInfoDto;
import at.waecm.backend.dto.CreateChargeDto;
import at.waecm.backend.dto.PaymentStatus;
import at.waecm.backend.model.Payment;
import at.waecm.backend.model.User;
import at.waecm.backend.repository.PaymentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.lang.invoke.MethodHandles;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "openNode")
public class OpenNodeController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final String BASE_URL = "/openNode";
    private final PaymentRepository paymentRepository;
    private final UserService userService;

    @Autowired
    public OpenNodeController(UserService userService, PaymentRepository paymentRepository) {
        this.userService = userService;
        this.paymentRepository = paymentRepository;
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/charge")
    public String createCharge(Authentication authUser, @RequestBody CreateChargeDto createChargeDto) {
        LOGGER.info("POST " + BASE_URL + "/charge");
        User user = userService.loadUser(authUser);
        if (user.getApiKey() == null || user.getApiKey().isEmpty())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No Api Key found");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev-api.opennode.com/v1/charges"))
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", user.getApiKey())
                .method("POST", HttpRequest.BodyPublishers.ofString("{" +
                        "\"ttl\":1440," +
                        "\"description\":\"" + createChargeDto.getDescription() + "\"," +
                        "\"amount\":" + createChargeDto.getAmount() + "," +
                        "\"currency\":\"" + createChargeDto.getCurrency() + "\"}"))
                .build();
        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "IO Exception occurred");
        } catch (InterruptedException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "InterruptedException occurred");
        }
        if (response != null) {
            System.out.println(response.body());
            return response.body();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Body is empty");
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/chargeInfo/{chargeId}")
    public ChargeInfoDto chargeInfo(Authentication authUser, @PathVariable("chargeId") String chargeId) {
        User user = userService.loadUser(authUser);
        if (user.getApiKey() == null || user.getApiKey().isEmpty())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No Api Key found");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev-api.opennode.com/v1/charge/" + chargeId))
                .header("Accept", "application/json")
                .header("Authorization", user.getApiKey())
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            System.out.println("IOException ...");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "IO Exception occurred");
        } catch (InterruptedException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "InterruptedException occurred");
        }
        if (response != null) {
            try {
                ChargeInfoDto chargeInfoDto = (new ObjectMapper().readValue(response.body(), ChargeInfoDataDto.class)).getData();
                if (chargeInfoDto.getStatus() == PaymentStatus.paid) {
                    Optional<Payment> existingPayment = paymentRepository.findById(chargeInfoDto.getId());
                    if (!existingPayment.isPresent()) {
                        Payment payment = new Payment(chargeInfoDto.getId(), user.getId(), chargeInfoDto);
                        paymentRepository.save(payment);
                    }
                }
                return chargeInfoDto;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Error while deserializing json");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Body is empty");
    }

}
