package com.hamgar.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="publicId", unique = true)
    private UUID publicId;
    @ManyToOne
    private Producto producto;
    @ManyToOne
    private Order pedido;
}
