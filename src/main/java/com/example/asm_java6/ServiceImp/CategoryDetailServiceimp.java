package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Repo.CategoryDetailDao;
import com.example.asm_java6.Model.CategoryDetail;
import com.example.asm_java6.Service.CategoryDetailService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryDetailServiceimp implements CategoryDetailService {

  @Autowired
  private CategoryDetailDao categoryDetailDao;

  @Override
  public List<CategoryDetail> getCategoryDetailsByCategoryId(String categoryId) {
    return categoryDetailDao.findByCategoryId(categoryId);
  }
}
