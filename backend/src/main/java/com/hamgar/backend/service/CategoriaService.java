package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateCategoriaRequest;
import com.hamgar.backend.dto.response.CategoriaResponse;
import com.hamgar.backend.model.Categoria;
import com.hamgar.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public CategoriaResponse update(Long id, CreateCategoriaRequest request) {
        Categoria categoria = categoriaRepository.findById(id).orElse(null);
        categoria.setNombre(request.getNombre());
        categoriaRepository.save(categoria);
        return CategoriaResponse.from(categoria);
    }

    @Transactional
    public Map<String, String> delete(Long id) {
        categoriaRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Category deleted");
        return response;
    }
}
