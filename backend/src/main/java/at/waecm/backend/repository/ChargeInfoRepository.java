package at.waecm.backend.repository;

import at.waecm.backend.dto.ChargeInfoDto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChargeInfoRepository extends MongoRepository<ChargeInfoDto, String> {

}
