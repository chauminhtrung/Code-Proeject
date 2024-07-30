package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailDao extends JpaRepository<OrderDetail, Long> {
}
