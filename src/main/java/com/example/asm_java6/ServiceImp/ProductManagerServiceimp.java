package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Repo.ProductDao;
import com.example.asm_java6.Service.ProductManagerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductManagerServiceimp implements ProductManagerService {

  @Autowired
  private ProductDao productDao;
  @Override
  public List<Product> findAll() {
    return productDao.findAll();
  }
}
