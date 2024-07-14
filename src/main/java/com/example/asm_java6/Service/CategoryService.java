package com.example.asm_java6.Service;

import com.example.asm_java6.Model.Category;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface CategoryService {

  @Transactional
  List<Category> findAll();

  @Transactional
  Category findCategoryById(String categoryId);


}
