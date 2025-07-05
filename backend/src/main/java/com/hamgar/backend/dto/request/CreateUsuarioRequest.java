package com.hamgar.backend.dto.request;

import com.hamgar.backend.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class CreateUsuarioRequest {
    private String dni;
    private String nombres;
    private String apellidos;
    private Date fechaNacimiento;
    private String password;
    private String email;
    private String phone;
    private UserRole role;
}
