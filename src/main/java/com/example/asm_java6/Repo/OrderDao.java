package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderDao extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.account.username = :username")
    List<Order> findOrderByAccount_Username(String username);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.status = :newStatus WHERE o.id = :id")
    int updateStatusById(@Param("id") Long id, @Param("newStatus") String newStatus);


}
