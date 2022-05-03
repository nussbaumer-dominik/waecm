package at.waecm.backend.model;

import at.waecm.backend.dto.ChargeInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("payment")
@Data
@AllArgsConstructor
public class Payment {
    @Id
    @NonNull
    private String id;
    @NonNull
    private String userId;
    @NonNull
    private ChargeInfoDto chargeInfo;
}
