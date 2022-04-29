package at.waecm.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class UserDto {
    @Id
    @NonNull
    private String id;
    @NonNull
    private String name;
    private boolean apiKeyStored;
}
