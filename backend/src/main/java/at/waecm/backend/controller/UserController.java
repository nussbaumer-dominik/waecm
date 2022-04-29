package at.waecm.backend.controller;

import at.waecm.backend.dto.UserDto;
import at.waecm.backend.mapper.UserMapper;
import at.waecm.backend.model.User;
import at.waecm.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.lang.invoke.MethodHandles;
import java.util.Optional;

@RestController
@RequestMapping(value = "user")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final String BASE_URL = "/user";
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/loggedIn")
    public UserDto userLoggedIn(Authentication authUser) {
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
        Jwt jwt = (Jwt) authUser.getPrincipal();
        System.out.println(jwt.getClaims().keySet());
        System.out.println(jwt.getClaims());
        Optional<User> optUser = userRepository.findById(jwt.getClaimAsString("sub"));
        if (optUser.isPresent()) {
            return !optUser.get().getApiKey().isEmpty();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/apiKey")
    public void setApiKey(Authentication authUser, @RequestBody String apiKey) {
        LOGGER.info("POST " + BASE_URL + "/apiKey " + apiKey);
        if (apiKey != null && apiKey.isEmpty()) throw new ResponseStatusException(HttpStatus.CONFLICT, "API key must not be null or empty");

        Jwt jwt = (Jwt) authUser.getPrincipal();
        System.out.println("User Id: " + jwt.getClaimAsString("sub"));
        Optional<User> optUser = userRepository.findById(jwt.getClaimAsString("sub"));
        if (optUser.isPresent()) {
            User user = optUser.get();
            user.setApiKey(apiKey.trim());
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
