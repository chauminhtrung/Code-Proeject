package com.example.asm_java6.API;

import com.example.asm_java6.Dao.OrderDao;
import com.example.asm_java6.Model.Order;
import com.example.asm_java6.Model.Product;
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
import java.util.Map;


@RestController
@RequestMapping("/rest-orders")
public class OrderAPI {
    @Autowired
    OrderService orderService;


    @Autowired
    private DispatcherServlet dispatcherServlet;

    public void checkMappings() {
        HandlerMapping[] handlerMappings = dispatcherServlet.getHandlerMappings().toArray(new HandlerMapping[0]);
        for (HandlerMapping mapping : handlerMappings) {
            System.out.println(mapping.toString());
        }
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
            System.out.println("lo cac");
        }
        System.out.println("lo huhu");
        checkMappings();
        return ResponseEntity.ok(result);
    }


    }
