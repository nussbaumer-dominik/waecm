package at.waecm.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
@Data
public class User {
    @Id
    private String id;
    private String name;
    private String apiKey;

}
