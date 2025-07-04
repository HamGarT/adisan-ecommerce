package com.hamgar.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "publicId", unique = true)
    private UUID publicId;
    private String nombre;
    private String imageKey;
    private BigDecimal precio;
    private Integer stock;
    private String descripcion;
    @ManyToOne
    private Categoria categoria;

}
