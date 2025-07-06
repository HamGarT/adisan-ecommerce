package com.hamgar.backend.model;

import com.hamgar.backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "publicId", unique = true)
    private UUID publicId;
    private String dni;
    private String nombres;
    private String apellidos;
    private Date fechaNacimiento;
    private String password;
    private String email;
    private String phone;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @OneToMany(mappedBy = "usuario")
    private List<Order> pedidos;

}
