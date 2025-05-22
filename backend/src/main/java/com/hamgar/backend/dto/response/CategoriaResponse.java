package com.hamgar.backend.dto.response;

import com.hamgar.backend.model.Categoria;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class CategoriaResponse {
    private Long id;
    private String nombre;

    public static CategoriaResponse from(Categoria categoria) {
        return CategoriaResponse.builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .build();
    }
}
