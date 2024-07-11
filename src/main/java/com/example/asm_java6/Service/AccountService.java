package com.example.asm_java6.Service;



import com.example.asm_java6.Model.Account;

import java.util.List;

public interface AccountService {
    List<Account> findAll();

    Account findAccountsByUsername(String username);

    void save(Account acc);
}
