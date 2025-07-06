package com.hamgar.backend.dto.request;

import com.hamgar.backend.dto.ProductOrderItemDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class CreateOrderRequest {
    private String departamento;
    private String provincia;
    private String direccion;
    private UUID userId;
    private List<ProductOrderItemDTO> orderItems;
}
