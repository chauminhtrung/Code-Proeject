package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Dao.ProductDao;
import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Service.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceimp implements ProductService {

  @Autowired
  private ProductDao productDao;

  @Override
  public List<Product> findAll() {
    return productDao.findAll();
  }

  @Override
  public List<Product> findProductById(String productId) {
    return productDao.findProductById(productId);
  }
}
