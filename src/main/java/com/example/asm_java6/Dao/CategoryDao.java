package com.example.asm_java6.Dao;

import com.example.asm_java6.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDao extends JpaRepository<Category, String> {
}
