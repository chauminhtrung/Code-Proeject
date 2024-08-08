package com.example.asm_java6.API;


import com.example.asm_java6.Dto.OrderDto;
import com.example.asm_java6.Model.Order;
import com.example.asm_java6.Model.OrderDetail;
import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Repo.OrderDao;
import com.example.asm_java6.Service.OrderService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.validation.annotation.ValidationAnnotationUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.HandlerMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/rest-orders")
public class OrderAPI {
    @Autowired
    OrderService orderService;

    @Autowired
    OrderDao orderDao;

    @Autowired
    private DispatcherServlet dispatcherServlet;

    public void checkMappings() {
        HandlerMapping[] handlerMappings = dispatcherServlet.getHandlerMappings().toArray(new HandlerMapping[0]);
        for (HandlerMapping mapping : handlerMappings) {
            System.out.println(mapping.toString());
        }
    }

    @GetMapping("/getAllCourse")
    public ResponseEntity<?> doGetAllCourse() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Call Api Success");
        result.put("data", orderService.getOrders());
        return ResponseEntity.ok(result);
    }
    @GetMapping("/getCourseByid/{id}")
    public ResponseEntity<?> doGetCoursebyID(@PathVariable long id) {
        Map<String, Object> result = new HashMap<>();
        try {
            Order order = orderService.findById(id);
            List<OrderDetail> orderDetails = orderService.getOrderDetailsByOrderId(id);
            OrderDto orderDto = new OrderDto();
            orderDto.setOrder(order);
            orderDto.setOrderDetails(orderDetails);
            if (order != null) {
                result.put("success", true);
                result.put("message", "Call Api Success");
                result.put("data", orderDto);
            } else {
                result.put("success", false);
                result.put("message", "CourseDetail not found");
                result.put("data", null);
            }
        } catch (Exception e) {
            result.put("Error", false);
            result.put("message", "Call Api Error");
            result.put("data", null);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/createOrder")
    public ResponseEntity<?> crateOrder(@RequestBody JsonNode orderData) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("success", true);
            result.put("message", "Call Api Success");
            result.put("data", orderService.create(orderData));
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Call Api Error");
            result.put("data", null);
            e.printStackTrace();

        }

        checkMappings();
        return ResponseEntity.ok(result);
    }
    @PatchMapping("updateStatus/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Order updatedOrder) {

        Map<String, Object> result = new HashMap<>();
        try {
            Order order = orderService.findById(orderId);
            order.setStatus(updatedOrder.getStatus());
            Order savedOrder = orderDao.save(order);
            result.put("success", true);
            result.put("message", "Call Api Success");
            result.put("data", savedOrder);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Call Api Error");
            result.put("data", null);
            e.printStackTrace();

        }
        return ResponseEntity.ok(result);
    }

    }
