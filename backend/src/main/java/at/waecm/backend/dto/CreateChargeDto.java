package at.waecm.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
public class CreateChargeDto {
    @NonNull
    private double amount;
    private String description;
    private String currency;
}
