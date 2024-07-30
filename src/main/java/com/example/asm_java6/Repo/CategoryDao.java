package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDao extends JpaRepository<Category, String> {
  List<Category> findAll();
}
