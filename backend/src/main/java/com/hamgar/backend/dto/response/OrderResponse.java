package com.hamgar.backend.dto.response;

import com.hamgar.backend.enums.OrderStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class OrderResponse {
    private UUID id;
    private BigDecimal precioTotal;
    private int totalItems;
    private Instant createdAt;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    private String departamento;
    private String provincia;
    private String direccion;
}
