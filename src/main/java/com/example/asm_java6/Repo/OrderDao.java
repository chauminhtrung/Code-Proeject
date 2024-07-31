package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDao extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.account.username = :username")
    List<Order> findOrderByAccount_Username(String username);
}
