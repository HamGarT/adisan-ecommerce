package com.hamgar.backend.controller;

import com.hamgar.backend.dto.response.OrderItemResponse;
import com.hamgar.backend.repository.OrderItemRepository;
import com.hamgar.backend.service.IOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/order-item")
public class OrderItemController {
    @Autowired
    private IOrderItemService orderItemService;

    @GetMapping("/order/{id}")
    public ResponseEntity<List<OrderItemResponse>> get(@PathVariable UUID id) {
        List<OrderItemResponse> orderItemResponses = orderItemService.getOrderItemsByOrderId(id);
        return new ResponseEntity<>(orderItemResponses, HttpStatus.OK);
    }
}
