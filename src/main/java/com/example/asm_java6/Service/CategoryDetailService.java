package com.example.asm_java6.Service;

import com.example.asm_java6.Model.CategoryDetail;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface CategoryDetailService {

  @Transactional
  List<CategoryDetail> getCategoryDetailsByCategoryId(String categoryId);
}
