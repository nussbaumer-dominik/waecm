package at.waecm.backend.model;

import at.waecm.backend.dto.ChargeInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("payment")
@Data
@AllArgsConstructor
public class Payment {
    @NonNull
    private String userId;
    @NonNull
    private ChargeInfoDto chargeInfo;
}
