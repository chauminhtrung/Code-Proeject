package com.example.asm_java6.Dao;

import com.example.asm_java6.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {
    List<Cart> findByAccount_Username(String username) ;
//    void addCart(Cart cart);
}
