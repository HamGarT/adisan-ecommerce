package com.hamgar.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hamgar.backend.model.Producto;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class OrderItemResponse {
    private UUID id;
    private int cantidad;
    @JsonIgnoreProperties({"categoria", "stock", "id"})
    private ProductoResponse producto;
}
