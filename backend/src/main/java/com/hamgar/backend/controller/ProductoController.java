package com.hamgar.backend.controller;

import com.hamgar.backend.dto.request.CreateProductoRequest;
import com.hamgar.backend.dto.response.ProductoResponse;
import com.hamgar.backend.model.Producto;
import com.hamgar.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @PostMapping("/add")
    public ResponseEntity<ProductoResponse> create(@RequestBody CreateProductoRequest request) throws IOException {
        Producto producto = productoService.create(request);
        return new ResponseEntity<>(ProductoResponse.from(producto), HttpStatus.CREATED);
    }

    @GetMapping
    public  ResponseEntity<List<ProductoResponse>> getAll(){
        List<ProductoResponse> productoResponses = productoService.findAll();
        return new ResponseEntity<>(productoResponses, HttpStatus.OK);
    }
}
