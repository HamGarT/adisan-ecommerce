package com.hamgar.backend.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCategoriaRequest {
    private String nombre;
}
