package com.example.asm_java6.Dao;


import com.example.asm_java6.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {

  @Query("select o from Product o where o.available = false order by NEWID() limit 8")
  List<Product> findAllRandom();

  List<Product> findAll();

//  @Query("select p from Product p where p.categoryde.id =?1")
//  List<Product> findByCategoryId(String cid);
}
