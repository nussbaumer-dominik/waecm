package at.waecm.backend.controller;

import at.waecm.backend.Service.UserService;
import at.waecm.backend.dto.CreateChargeDto;
import at.waecm.backend.model.User;
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

@RestController
@RequestMapping(value = "openNode")
public class OpenNodeController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final String BASE_URL = "/openNode";
    private final UserService userService;

    @Autowired
    public OpenNodeController(UserService userService) {
        this.userService = userService;
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/charge")
    public String createCharge(Authentication authUser, @RequestBody CreateChargeDto createChargeDto) {
        LOGGER.info("POST " + BASE_URL + "/charge");
        User user = userService.loadUser(authUser);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://dev-api.opennode.com/v1/charges"))
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "b941748e-8988-4728-96a6-f1ce77c522b5")
                .method("POST", HttpRequest.BodyPublishers.ofString("{" +
                        "\"ttl\":1440," +
                        "\"description\":\"" + createChargeDto.getDescription() + "\"," +
                        "\"amount\":" + createChargeDto.getAmount() + "," +
                        "\"currency\":\"" + createChargeDto.getCurrency() + "\"," +
                        "\"callback_url\":\"localhost:4444\"," +
                        "\"success_url\":\"localhost:4444\"}"))
                .build();
        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            System.out.println("IOException ...");
        } catch (InterruptedException e) {
            System.out.println("InterruptedException ...");
        }
        if (response != null) {
            System.out.println(response.body());
            return response.body();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Body is empty");
    }

}
