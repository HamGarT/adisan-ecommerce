package com.hamgar.backend.service;

import com.hamgar.backend.dto.response.OrderItemResponse;
import com.hamgar.backend.dto.response.ProductoResponse;
import com.hamgar.backend.model.OrderItem;
import com.hamgar.backend.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderItemServiceImpl implements IOrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private S3Presigner s3Presigner;

    @Override
    public List<OrderItemResponse> getOrderItemsByOrderId(UUID id) {
        List<OrderItemResponse> orderItemsResponse = new ArrayList<>();
        List<OrderItem> orderItems = orderItemRepository.findOrderItemsByOrdenPublicId(id);
        for (OrderItem orderItem : orderItems) {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket("test")
                    .key(orderItem.getProducto().getImageKey())
                    .build();
            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(15))
                    .getObjectRequest(getObjectRequest)
                    .build();
            String signedUrl = s3Presigner.presignGetObject(presignRequest).url().toString();
            OrderItemResponse orderItemResponse = OrderItemResponse.builder()
                    .cantidad(orderItem.getCantidad())
                    .id(orderItem.getPublicId())
                    .producto( ProductoResponse.from(orderItem.getProducto()))
                    .build();

            orderItemResponse.getProducto().setImageUrl(signedUrl);
            orderItemsResponse.add(orderItemResponse);
        }
        return orderItemsResponse;
    }
}
