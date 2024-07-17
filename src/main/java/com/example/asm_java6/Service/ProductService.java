package com.example.asm_java6.Service;

import com.example.asm_java6.Model.Product;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface ProductService {

  @Transactional
  List<Product> findAll();

  @Transactional
  Product findProductById(Integer productId);

  @Transactional
  List<Product> findAllRandom();

  @Transactional
  List<Product> getProductsByCategoryId(String categoryId);
}
