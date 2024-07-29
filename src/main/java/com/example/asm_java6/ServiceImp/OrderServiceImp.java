package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Dao.OrderDao;
import com.example.asm_java6.Dao.OrderDetailDao;
import com.example.asm_java6.Model.Order;
import com.example.asm_java6.Model.OrderDetail;
import com.example.asm_java6.Service.OrderService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderDao orderDao;

    @Autowired
    OrderDetailDao orderDetailDao;

    @Override
    public Order create(Order orderData) {
        ObjectMapper mapper = new ObjectMapper();

        Order order = mapper.convertValue(orderData, Order.class);
        orderDao.save(order);

        TypeReference<List<OrderDetail>> type = new TypeReference<List<OrderDetail>>() {};
        List<OrderDetail> orderDetails = mapper.convertValue(orderData.getOrderDetails(), type)
                .stream().peek(d -> d.setOrder(order)).collect(Collectors.toList());
        orderDetailDao.saveAll(orderDetails);

        return order;
    }

    @Override
    public List<Order> getOrders() {
        return orderDao.findAll();
    }
}
