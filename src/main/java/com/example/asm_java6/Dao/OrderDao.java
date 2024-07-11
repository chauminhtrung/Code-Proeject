package com.example.asm_java6.Dao;

import com.example.asm_java6.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<Order, Long> {
}
