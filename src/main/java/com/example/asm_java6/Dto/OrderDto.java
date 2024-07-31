package com.example.asm_java6.Dto;

import com.example.asm_java6.Model.Order;
import com.example.asm_java6.Model.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Order order;
    private List<OrderDetail> orderDetails;
}
