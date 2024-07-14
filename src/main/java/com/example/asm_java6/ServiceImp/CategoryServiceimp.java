package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Dao.CategoryDao;
import com.example.asm_java6.Dao.ProductDao;
import com.example.asm_java6.Model.Category;
import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Service.CategoryService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceimp implements CategoryService {

  @Autowired
  private CategoryDao categoryDao;

  @Override
  public List<Category> findAll() {
    return categoryDao.findAll();
  }
  @Override
  public Category findCategoryById(String categoryId) {
    Optional<Category> optionalProduct = categoryDao.findById(categoryId);
    return optionalProduct.orElse(null);
  }
}
