package com.example.asm_java6.Dao;

import com.example.asm_java6.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, String> {
}
