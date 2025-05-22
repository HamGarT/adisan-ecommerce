package com.hamgar.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hamgar.backend.model.Categoria;
import com.hamgar.backend.model.Producto;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.UUID;

@Builder
@Data
public class ProductoResponse {
    private UUID id;
    private String nombre;
    private BigDecimal precio;
    private Integer stock;
    private String imageUrl;
    @JsonIgnoreProperties({"productos"})
    private Categoria categoria;

    public static ProductoResponse from(Producto producto) {
         return ProductoResponse.builder()
                 .id(producto.getPublicId())
                 .nombre(producto.getNombre())
                 .precio(producto.getPrecio())
                 .stock(producto.getStock())
                 .precio(producto.getPrecio())
                 .categoria(producto.getCategoria())
                 .build();

    }
}
