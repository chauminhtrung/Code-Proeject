package com.example.asm_java6.Service;

import com.example.asm_java6.Model.Authority;

import java.util.List;

public interface AuthorityService {
    void save(Authority authority);

    Authority saveA(Authority authority);

    List<Authority> findAll();

    void deleteById(int id);
}
