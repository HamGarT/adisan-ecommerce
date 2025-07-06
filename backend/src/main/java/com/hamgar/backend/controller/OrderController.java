package com.hamgar.backend.controller;

import com.hamgar.backend.dto.request.CreateOrderRequest;
import com.hamgar.backend.dto.response.OrderAdminResponse;
import com.hamgar.backend.dto.response.OrderItemResponse;
import com.hamgar.backend.dto.response.OrderResponse;
import com.hamgar.backend.model.Order;
import com.hamgar.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @GetMapping("/list-all")
    public ResponseEntity<List<OrderAdminResponse>> getAllOrders(){
        List<OrderAdminResponse> orderAdminResponses = orderService.getAllOrders();
        return new ResponseEntity<>(orderAdminResponses, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createOrder(@RequestBody CreateOrderRequest request) {
        Order order = orderService.create(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Order was created successfully: " + order.getPublicId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<OrderResponse>> getAllUserOrders(@PathVariable("id") UUID userId) {
        List<OrderResponse> orderResponses = orderService.getAllUserOrder(userId);
        return ResponseEntity.ok(orderResponses);
    }


}
