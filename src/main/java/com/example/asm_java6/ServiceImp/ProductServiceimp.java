package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Dao.ProductDao;
import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Service.ProductService;
import java.util.List;
import java.util.Optional;
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
  public Product findProductById(Integer productId) {
    Optional<Product> optionalProduct = productDao.findById(productId);
    return optionalProduct.orElse(null);
  }

  @Override
  public List<Product> findAllRandom() {
    return productDao.findAllRandom();
  }

  @Override
  public List<Product> getProductsByCategoryId(String categoryId) {
    return productDao.findByCategoryId(categoryId);
  }

  @Override
  public Product Save(Product pro) {
    return productDao.save(pro);
  }
}
