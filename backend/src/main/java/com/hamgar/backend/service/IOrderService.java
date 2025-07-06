package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateOrderRequest;
import com.hamgar.backend.dto.response.OrderAdminResponse;
import com.hamgar.backend.dto.response.OrderItemResponse;
import com.hamgar.backend.dto.response.OrderResponse;
import com.hamgar.backend.model.Order;

import java.util.List;
import java.util.UUID;

public interface IOrderService {
    Order create(CreateOrderRequest order);
    List<OrderResponse> getAllUserOrder(UUID userId);
    List<OrderAdminResponse> getAllOrders();

}
