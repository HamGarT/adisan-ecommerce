package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateCategoriaRequest;
import com.hamgar.backend.dto.response.CategoriaResponse;
import com.hamgar.backend.model.Categoria;
import com.hamgar.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria create(CreateCategoriaRequest request) {
        Categoria categoria = Categoria.builder()
                .publicId(UUID.randomUUID())
                .nombre(request.getNombre())
                .build();
        return categoriaRepository.save(categoria);
    }

    public List<CategoriaResponse> readAll() {
        return  categoriaRepository.findAll()
                .stream()
                .map(CategoriaResponse::from)
                .collect(Collectors.toList());
    }
}
