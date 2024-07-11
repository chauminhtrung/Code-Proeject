package com.example.asm_java6.Dao;


import com.example.asm_java6.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDao extends JpaRepository<Product, Integer> {
    @Query("select p from Product p where p.categoryde.id =?1")
    List<Product> findByCategoryId(String cid);
}
