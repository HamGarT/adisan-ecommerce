package com.hamgar.backend.repository;

import com.hamgar.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByPublicId(UUID id);
    List<Order> findByUsuarioPublicId(UUID userId);
}
