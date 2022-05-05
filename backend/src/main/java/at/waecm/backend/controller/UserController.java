package at.waecm.backend.controller;

import at.waecm.backend.Service.UserService;
import at.waecm.backend.dto.ChargeInfoDto;
import at.waecm.backend.dto.UserDto;
import at.waecm.backend.mapper.UserMapper;
import at.waecm.backend.model.Payment;
import at.waecm.backend.model.User;
import at.waecm.backend.repository.PaymentRepository;
import at.waecm.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.lang.invoke.MethodHandles;
import java.util.*;

@RestController
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    MongoTemplate mongoTemplate;
    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final String BASE_URL = "/user";
    private final UserRepository userRepository;
    private final UserService userService;
    private final PaymentRepository paymentRepository;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.paymentRepository = paymentRepository;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/loggedIn")
    public UserDto userLoggedIn(Authentication authUser) {
        LOGGER.info("POST " + BASE_URL + "/apiKey");

        Jwt jwt = (Jwt) authUser.getPrincipal();
        System.out.println("User Id: " + jwt.getClaimAsString("sub"));
        Optional<User> user = userRepository.findById(jwt.getClaimAsString("sub"));
        if (user.isPresent()) {
            return UserMapper.entityToDto(user.get());
        } else {
            User newUser = new User(jwt.getClaimAsString("sub"), jwt.getClaimAsString("name"));
            userRepository.save(newUser);
            return UserMapper.entityToDto(newUser);
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/apiKey")
    public boolean apiKeyStored(Authentication authUser) {
        LOGGER.info("POST " + BASE_URL + "/apiKey");
        User user = userService.loadUser(authUser);
        return user.getApiKey() != null && !user.getApiKey().isEmpty();
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/apiKey")
    public void setApiKey(Authentication authUser, @RequestBody String apiKey) {
        LOGGER.info("POST " + BASE_URL + "/apiKey " + apiKey);
        /*if (apiKey == null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "API key must not be null or empty");*/

        User user = userService.loadUser(authUser);
        user.setApiKey(apiKey.trim());

        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(user.getId()));
        Update update = new Update();
        update.set("apiKey", apiKey);
        mongoTemplate.updateFirst(query, update, User.class);

        //userRepository.save(user);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/localCurrency")
    public String getLocalCurrency(Authentication authUser) {
        LOGGER.info("GET " + BASE_URL + "/localCurrency");
        return userService.loadUser(authUser).getLocalCurrency();
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/localCurrency")
    public void setLocalCurrency(Authentication authUser, @RequestBody String localCurrency) {
        LOGGER.info("POST " + BASE_URL + "/localCurrency " + localCurrency);
        if (localCurrency == null || localCurrency.isEmpty())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Location currency must not be null or empty");
        User user = userService.loadUser(authUser);
        user.setLocalCurrency(localCurrency);

        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(user.getId()));
        Update update = new Update();
        update.set("localCurrency", localCurrency);
        mongoTemplate.updateFirst(query, update, User.class);

        //userRepository.save(user);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/history")
    public List<ChargeInfoDto> getPaymentHistory(Authentication authUser) {
        User user = userService.loadUser(authUser);
        List<Payment> payments = paymentRepository.findAllByUserId(user.getId());
        List<ChargeInfoDto> chargeInfoDtos = new ArrayList<>();
        for (Payment p : payments) {
            chargeInfoDtos.add(p.getChargeInfo());
        }
        //chargeInfoDtos = payments.stream().map(m -> m.getChargeInfo()).toList();
        //Collections.reverse(chargeInfoDtos);
        chargeInfoDtos.sort((ChargeInfoDto c1, ChargeInfoDto c2) -> (int) (c2.getCreated_at() - c1.getCreated_at()));
        return chargeInfoDtos;
    }
}
