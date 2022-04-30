package at.waecm.backend.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class UserDto {
    @Id
    private String id;
    private String name;
    private boolean apiKeyStored;
    private String localCurrency;
}
