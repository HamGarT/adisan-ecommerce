package com.hamgar.backend.controller;

import com.hamgar.backend.dto.request.CreateUsuarioRequest;
import com.hamgar.backend.dto.request.LoginUsuarioRequest;
import com.hamgar.backend.dto.response.UsuarioResponse;
import com.hamgar.backend.model.Usuario;
import com.hamgar.backend.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private IUsuarioService usuarioService;

    @PostMapping("/create")
    public ResponseEntity<UsuarioResponse> create(@RequestBody CreateUsuarioRequest request) {
        UsuarioResponse usuarioResponse = usuarioService.create(request);
        return new ResponseEntity<>(usuarioResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponse> login(@RequestBody LoginUsuarioRequest request) {
        UsuarioResponse usuarioResponse = usuarioService.findByEmailAndPassword(request);
        if (usuarioResponse == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(usuarioResponse, HttpStatus.OK);
    }

}
