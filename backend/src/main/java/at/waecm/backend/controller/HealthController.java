package at.waecm.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String getHealthStatus() {
        return "OK";
    }

    @GetMapping("/test")
    public String Test(Authentication user) {
        Jwt jwt = (Jwt) user.getPrincipal();
        System.out.println(jwt.getClaims().keySet());
        System.out.println(jwt.getClaims());
        return "Welcome " + jwt.getClaimAsString("name");
    }
}
