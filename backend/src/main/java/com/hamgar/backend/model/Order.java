package com.hamgar.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "publicId", unique = true)
    private UUID publicId;
    private BigDecimal precioTotal;
    private Instant createdAt;
    private String status;
    private String ciudad;
    private String provincia;
    private String direccion;
    @ManyToOne
    private Usuario usuario;
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}


