package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Repo.OrderDao;
import com.example.asm_java6.Repo.OrderDetailDao;
import com.example.asm_java6.Model.Order;
import com.example.asm_java6.Model.OrderDetail;
import com.example.asm_java6.Service.OrderService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderDao orderDao;

    @Autowired
    OrderDetailDao orderDetailDao;

    @Override
    public Order create(JsonNode orderData) {
        ObjectMapper mapper = new ObjectMapper();

        Order order = mapper.convertValue(orderData, Order.class);
        orderDao.save(order);
        System.out.println("Add order thành công"+order);
        TypeReference<List<OrderDetail>> type = new TypeReference<List<OrderDetail>>() {};
        List<OrderDetail> orderDetails = mapper.convertValue(orderData.get("orderDetails"), type)
                .stream().peek(d -> d.setOrder(order)).collect(Collectors.toList());
        orderDetailDao.saveAll(orderDetails);
        return orderDao.save(order);
    }

    @Override
    public List<Order> getOrders() {
        return orderDao.findAll();

    }

    @Override
    public Order findById(Long id) {
        return orderDao.findById(id).get();
    }

    @Override
    public List<Order> findOrderByAccount_Username(String username) {
        List<Order> orders = orderDao.findOrderByAccount_Username(username);
        orders.sort((o1, o2) -> o2.getId().compareTo(o1.getId()));
        return orders;
    }

    @Override
    public List<OrderDetail> getOrderDetailsByOrderId(long id) {
        return orderDao.findById(id).get().getOrderDetails();
    }


}
