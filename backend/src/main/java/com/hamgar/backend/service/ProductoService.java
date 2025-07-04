package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateProductoRequest;
import com.hamgar.backend.dto.response.ProductoResponse;
import com.hamgar.backend.model.Producto;
import com.hamgar.backend.repository.ProductoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private ImageService imageService;
    @Autowired
    private S3Presigner s3Presigner;
    private String bucket = "test";



    public  Producto findByPublicId(UUID publicId){
        return productoRepository.findByPublicId(publicId);
    }

    public Producto createTwo(CreateProductoRequest request) throws IOException {
        Producto producto = Producto.builder()
                .publicId( UUID.randomUUID())
                .nombre(request.getNombre())
                .precio(request.getPrecio())
                .categoria(request.getCategoria())
                .stock(request.getStock())
                .build();
        if(request.getFile() != null){
            String imageFileName = imageService.generateImageName(request.getFile().getOriginalFilename());
            System.out.println(imageFileName);
            producto.setImageKey(imageFileName);
            imageService.uploadImage(request.getFile(), imageFileName);
        }
        return productoRepository.save(producto);
    }

    public List<ProductoResponse> findAll() {
        List<Producto> productos = productoRepository.findAll();
        List<ProductoResponse> productoResponses = new ArrayList<>();
        for (Producto producto : productos) {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket("test")
                    .key(producto.getImageKey())
                    .build();
            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(15))
                    .getObjectRequest(getObjectRequest)
                    .build();
            String signedUrl = s3Presigner.presignGetObject(presignRequest).url().toString();
            ProductoResponse productoRespons = ProductoResponse.from(producto);
            productoRespons.setImageUrl(signedUrl);
            productoResponses.add(productoRespons);
        }
        return productoResponses;
    }

    @Transactional
    public ProductoResponse DeleteProducto(UUID publicId){
//        Producto producto = productoRepository.deleteByPublicId(publicId);
//        return ProductoResponse.from(producto);
        Producto producto = productoRepository.findByPublicId(publicId);
        if (producto != null) {
            productoRepository.delete(producto);
            return ProductoResponse.from(producto);
        }
        throw new EntityNotFoundException("Product not found with id: " + publicId);
    }

    public ProductoResponse UpdateProducto(UUID publicId, CreateProductoRequest request) throws IOException {
        Producto producto = productoRepository.findByPublicId(publicId);
        if (producto != null) {
            producto.setNombre(request.getNombre());
            producto.setPrecio(request.getPrecio());
            producto.setCategoria(request.getCategoria());
            producto.setStock(request.getStock());
            if(request.getFile() != null){
                String imageFileName = imageService.generateImageName(request.getFile().getOriginalFilename());
                System.out.println(imageFileName);
                producto.setImageKey(imageFileName);
                imageService.uploadImage(request.getFile(), imageFileName);
            }
        }
        return ProductoResponse.from(productoRepository.save(producto));
    }
}
