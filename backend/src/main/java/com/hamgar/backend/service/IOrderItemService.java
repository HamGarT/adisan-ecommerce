package com.hamgar.backend.service;

import com.hamgar.backend.dto.response.OrderItemResponse;

import java.util.List;
import java.util.UUID;

public interface IOrderItemService {
    List<OrderItemResponse> getOrderItemsByOrderId(UUID id);
}
