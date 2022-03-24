package at.waecm.backend.controller;

import at.waecm.backend.model.Foo;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;
import static org.apache.commons.lang3.RandomStringUtils.randomNumeric;

@RestController
@RequestMapping(value = "/demo")
public class DemoController {
    @GetMapping(value = "/{id}")
    public Foo findOne(@PathVariable Long id) {
        return new Foo(Long.parseLong(randomNumeric(2)), randomAlphabetic(4));
    }

    @GetMapping
    public String findAll(Authentication user) {
        /*List<Foo> fooList = new ArrayList<Foo>();
        fooList.add(new Foo(Long.parseLong(randomNumeric(2)), randomAlphabetic(4)));
        fooList.add(new Foo(Long.parseLong(randomNumeric(2)), randomAlphabetic(4)));
        fooList.add(new Foo(Long.parseLong(randomNumeric(2)), randomAlphabetic(4)));
        return fooList;*/
        Jwt jwt = (Jwt) user.getPrincipal();
        return "Welcome " + jwt.getClaimAsString("name");
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void create(@RequestBody Foo newFoo) {
        System.out.println(("Foo created"));
    }
}
