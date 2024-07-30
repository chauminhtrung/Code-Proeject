package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDao extends JpaRepository<Authority, String> {
}
