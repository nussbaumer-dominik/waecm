package at.waecm.backend.mapper;

import at.waecm.backend.dto.UserDto;
import at.waecm.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static UserDto entityToDto(User user) {
        if (user == null) return null;
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .apiKeyStored(user.getApiKey() != null)
                .localeCurrency(user.getLocaleCurrency())
                .build();
    }
}
