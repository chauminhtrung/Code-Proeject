package com.example.asm_java6.Service;

import com.example.asm_java6.Model.Product;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface ProductManagerService {
  @Transactional
  List<Product> findAll();
}