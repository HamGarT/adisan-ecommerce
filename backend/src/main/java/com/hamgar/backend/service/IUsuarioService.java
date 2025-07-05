package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateUsuarioRequest;
import com.hamgar.backend.dto.request.LoginUsuarioRequest;
import com.hamgar.backend.dto.response.UsuarioResponse;
import com.hamgar.backend.model.Usuario;

public interface IUsuarioService {
    UsuarioResponse findByEmailAndPassword(LoginUsuarioRequest request);
    UsuarioResponse create(CreateUsuarioRequest usuario);
}
