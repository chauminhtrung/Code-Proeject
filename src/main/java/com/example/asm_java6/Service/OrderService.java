package com.example.asm_java6.Service;

import com.example.asm_java6.Model.Order;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public interface OrderService {

    Order create(JsonNode orderData);

    List<Order> getOrders();

    Order findById(Long username);
}
