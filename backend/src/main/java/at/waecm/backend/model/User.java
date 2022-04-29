package at.waecm.backend.model;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
@Data
@RequiredArgsConstructor
public class User {
    @Id
    @NonNull
    private String id;
    @NonNull
    private String name;
    private String apiKey;

}
