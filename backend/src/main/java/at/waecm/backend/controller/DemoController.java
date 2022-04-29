package at.waecm.backend.controller;

import at.waecm.backend.model.User;
import at.waecm.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.lang.invoke.MethodHandles;

@RestController
@RequestMapping(value = "demo")
public class DemoController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final String BASE_URL = "/demo";
    private final UserRepository userRepository;

    @Autowired
    public DemoController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/addUser")
    public void findAllAdminPage(@RequestBody String name) {
        LOGGER.info("POST " + BASE_URL + "/addUser");
        System.out.println("Adding User with name: " + name);
        /*User user = new User();
        user.setApiKey(name);
        userRepository.save(user);*/
    }
}
