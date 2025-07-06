package com.hamgar.backend.service;

import com.hamgar.backend.dto.request.CreateOrderRequest;
import com.hamgar.backend.dto.response.OrderAdminResponse;
import com.hamgar.backend.dto.response.OrderItemResponse;
import com.hamgar.backend.dto.response.OrderResponse;
import com.hamgar.backend.dto.response.UsuarioResponse;
import com.hamgar.backend.enums.OrderStatus;
import com.hamgar.backend.model.Order;
import com.hamgar.backend.model.OrderItem;
import com.hamgar.backend.model.Producto;
import com.hamgar.backend.model.Usuario;
import com.hamgar.backend.repository.OrderRepository;
import com.hamgar.backend.repository.ProductoRepository;
import com.hamgar.backend.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements  IOrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public Order create(CreateOrderRequest request) {
        double totalPrice = 0;
        int quantity = 0;
        List<OrderItem> orderItems = new ArrayList<>();
        Usuario usuario = usuarioRepository.findByPublicId(request.getUserId());
        if (usuario == null) {
            throw new EntityNotFoundException("Usuario not found with id: " + request.getUserId());
        }
        Order order = Order.builder()
                .publicId(UUID.randomUUID())
                .usuario(usuario)
                .createdAt(Instant.now())
                .departamento(request.getDepartamento())
                .provincia(request.getProvincia())
                .direccion(request.getDireccion())
                .status(OrderStatus.pendiente)
                .build();

        for (var item : request.getOrderItems()) {
            Producto producto = productoRepository.findByPublicId(item.getId());
            if (producto == null) {
                throw new EntityNotFoundException("Producto not found with id: " + item.getId());
            }
            totalPrice += producto.getPrecio().doubleValue() * item.getCantidad();
            quantity += item.getCantidad();
            OrderItem orderItem = OrderItem.builder()
                    .producto(producto)
                    .cantidad(item.getCantidad())
                    .orden(order)
                    .publicId(UUID.randomUUID())
                    .build();

            orderItems.add(orderItem);
        }
        order.setItems(orderItems);
        order.setPrecioTotal(new BigDecimal(totalPrice));
        order.setTotalProductItems(quantity);
        return orderRepository.save(order);
    }

    @Override
    public List<OrderResponse> getAllUserOrder(UUID userId) {
        int totalItems = 0;
        Usuario usuario = usuarioRepository.findByPublicId(userId);
        if (usuario == null) {
            throw new EntityNotFoundException("Usuario not found with id: " + userId);
        }
        List<Order> orders = orderRepository.findByUsuarioPublicId(userId);
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            OrderResponse orderResponse = OrderResponse.builder()
                    .id(order.getPublicId())
                    .status(order.getStatus())
                    .createdAt(order.getCreatedAt())
                    .departamento(order.getDepartamento())
                    .provincia(order.getProvincia())
                    .direccion(order.getDireccion())
                    .totalItems(order.getTotalProductItems())
                    .precioTotal(order.getPrecioTotal())
                    .build();
            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }

    @Override
    public List<OrderAdminResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderAdminResponse> orderAdminResponses = new ArrayList<>();
        for (Order order : orders) {
            OrderAdminResponse orderAdminResponse = OrderAdminResponse.builder()
                    .id(order.getPublicId())
                    .status(order.getStatus())
                    .createdAt(order.getCreatedAt())
                    .departamento(order.getDepartamento())
                    .provincia(order.getProvincia())
                    .direccion(order.getDireccion())
                    .totalItems(order.getTotalProductItems())
                    .precioTotal(order.getPrecioTotal())
                    .usuario(UsuarioResponse.from(order.getUsuario()))
                    .build();
            orderAdminResponses.add(orderAdminResponse);
        }
        return orderAdminResponses;
    }

    @Override
    public void updateOrderStatus(UUID orderId, OrderStatus status) {
        Order order = orderRepository.findByPublicId(orderId);

        if (order == null) {
            throw new EntityNotFoundException("Order not found with id: " + orderId);
        }
        order.setStatus(status);
        orderRepository.save(order);
    }


}
