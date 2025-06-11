package com.hamgar.backend.dto.request;

import com.hamgar.backend.model.Categoria;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
public class CreateProductoRequestTwo {
    private String nombre;
    private BigDecimal precio;
    private Integer stock;
    private Categoria categoria;
    private MultipartFile file;
}
