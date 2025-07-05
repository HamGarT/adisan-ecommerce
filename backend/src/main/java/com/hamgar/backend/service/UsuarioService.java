package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateUsuarioRequest;
import com.hamgar.backend.dto.request.LoginUsuarioRequest;
import com.hamgar.backend.dto.response.UsuarioResponse;
import com.hamgar.backend.enums.UserRole;
import com.hamgar.backend.model.Usuario;
import com.hamgar.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsuarioService implements IUsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UsuarioResponse findByEmailAndPassword(LoginUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail());
        if (usuario == null || !usuario.getPassword().equals(request.getPassword())) {
            return null;
        }
        return UsuarioResponse.from(usuario);
    }

    @Override
    public UsuarioResponse create(CreateUsuarioRequest request) {
        Usuario usuario = Usuario.builder()
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .email(request.getEmail())
                .fechaNacimiento(request.getFechaNacimiento())
                .password(request.getPassword())
                .dni(request.getDni())
                .phone(request.getPhone())
                .publicId(UUID.randomUUID())
                .role(UserRole.CUSTOMER)
                .build();
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }
}
