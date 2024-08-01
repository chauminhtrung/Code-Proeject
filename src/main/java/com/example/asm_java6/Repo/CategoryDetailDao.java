package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.CategoryDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDetailDao extends JpaRepository<CategoryDetail, String> {
  List<CategoryDetail> findAll();
  List<CategoryDetail> findByCategoryId(String categoryId);
}
