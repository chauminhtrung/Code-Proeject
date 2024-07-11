package com.example.asm_java6.Dao;

import com.example.asm_java6.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDao extends JpaRepository<Account, Integer> {
    Account findAccountsByUsername(String username);
}
