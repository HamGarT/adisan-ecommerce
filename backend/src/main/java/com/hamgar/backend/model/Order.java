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
    private UUID uuid;
    private BigDecimal precioTotal;
    private Instant createdAt;
    @ManyToOne
    private Usuario usuario;
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}
