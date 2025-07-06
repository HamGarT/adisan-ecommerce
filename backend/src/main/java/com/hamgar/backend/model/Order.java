package com.hamgar.backend.model;

import com.hamgar.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "publicId", unique = true)
    private UUID publicId;
    private BigDecimal precioTotal;
    private int totalProductItems;
    private Instant createdAt;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    private String departamento;
    private String provincia;
    private String direccion;
    @ManyToOne
    private Usuario usuario;
    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}


