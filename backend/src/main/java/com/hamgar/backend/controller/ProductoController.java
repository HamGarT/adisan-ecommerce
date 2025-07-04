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
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/product")
public class ProductoController {
    @Autowired
    private ProductoService productoService;


    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity createTwo(@ModelAttribute CreateProductoRequest request) throws IOException {
        Producto producto = productoService.createTwo(request);
        return new ResponseEntity<>(ProductoResponse.from(producto), HttpStatus.CREATED);
    }
    @GetMapping
    public  ResponseEntity<List<ProductoResponse>> getAll(){
        List<ProductoResponse> productoResponses = productoService.findAll();
        return new ResponseEntity<>(productoResponses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> getOne(@PathVariable UUID id){
        Producto producto = productoService.findByPublicId(id);
        return new ResponseEntity<>(ProductoResponse.from(producto), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProductoResponse> delete(@PathVariable("id") UUID id){
        ProductoResponse productoResponse = productoService.DeleteProducto(id);
        return new ResponseEntity<>(productoResponse, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<ProductoResponse> updateOne(@PathVariable UUID id, @ModelAttribute CreateProductoRequest request) throws IOException {
        ProductoResponse productoResponse = productoService.UpdateProducto(id, request);
        return new ResponseEntity<>(productoResponse, HttpStatus.OK);
    }

}
