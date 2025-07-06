package com.hamgar.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ProductOrderItemDTO {
    private UUID id;
    private int cantidad;
}
