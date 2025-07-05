package com.hamgar.backend.dto.response;

import com.hamgar.backend.enums.UserRole;
import com.hamgar.backend.model.Usuario;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class UsuarioResponse {
    private UUID id;
    private String dni;
    private String nombres;
    private String apellidos;
    private Date fechaNacimiento;
    private String email;
    private String phone;
    private UserRole role;

    public static UsuarioResponse from(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getPublicId())
                .dni(usuario.getDni())
                .nombres(usuario.getNombres())
                .apellidos(usuario.getApellidos())
                .fechaNacimiento(usuario.getFechaNacimiento())
                .email(usuario.getEmail())
                .phone(usuario.getPhone())
                .role(usuario.getRole())
                .build();
    }

}
