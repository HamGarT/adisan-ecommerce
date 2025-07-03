package com.hamgar.backend.repository;

import com.hamgar.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Producto findByPublicId(UUID publicId);
    Producto deleteByPublicId(UUID publicId);
}
