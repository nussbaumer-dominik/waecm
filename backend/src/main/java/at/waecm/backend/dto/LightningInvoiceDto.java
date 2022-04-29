package at.waecm.backend.dto;

import lombok.Data;

@Data
public class LightningInvoiceDto {
    private Long created_at;
    private Long expires_at;
    private String payreq;
    private String settled_at;
}
