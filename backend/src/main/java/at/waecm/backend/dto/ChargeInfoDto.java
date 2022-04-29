package at.waecm.backend.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class ChargeInfoDto {
    @Id
    private String id;
    private String description;
    private double amount;
    private Long missing_amt;
    private PaymentStatus status;
    private double fiat_value;
    private double source_fiat_value;
    private String currency;
    private Long created_at;
    private String order_id;
    private String address;
    private Object metadata;
    private String expires_at;
    private String success_url;
    private Boolean auto_settle;
    private LightningInvoiceDto lightning_invoice;
    private ChainInvoiceDto chain_invoice;
    private String[] transactions;
    private String uri;
}
