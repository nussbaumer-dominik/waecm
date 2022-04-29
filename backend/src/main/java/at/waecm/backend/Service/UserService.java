package at.waecm.backend.Service;

import at.waecm.backend.model.User;
import at.waecm.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public User loadUser(Authentication authUser) {
        Jwt jwt = (Jwt) authUser.getPrincipal();
        Optional<User> optUser = userRepository.findById(jwt.getClaimAsString("sub"));
        if (optUser.isPresent()) {
            return optUser.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
