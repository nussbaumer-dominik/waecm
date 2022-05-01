package at.waecm.backend.repository;

import at.waecm.backend.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {

    @Query(value="{userId:'?0'}")
    List<Payment> findAllByUserId(String userId);
}
