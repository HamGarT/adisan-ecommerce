package com.hamgar.backend.controller;

import com.hamgar.backend.dto.request.CreateCategoriaRequest;
import com.hamgar.backend.dto.response.CategoriaResponse;
import com.hamgar.backend.model.Categoria;
import com.hamgar.backend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<CategoriaResponse>> getAll() {
        List<CategoriaResponse> categoriaResponses = categoriaService.readAll();
        return new ResponseEntity<>(categoriaResponses, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CategoriaResponse> create(@RequestBody CreateCategoriaRequest request) {
        Categoria categoria = categoriaService.create(request);
        return new ResponseEntity<>(CategoriaResponse.from(categoria), HttpStatus.CREATED);
    }


}
