package com.hamgar.backend.dto.request;

import com.hamgar.backend.enums.OrderStatus;
import lombok.Data;

@Data
public class OrderStatusUpdateRequest {
    private OrderStatus status;
}
