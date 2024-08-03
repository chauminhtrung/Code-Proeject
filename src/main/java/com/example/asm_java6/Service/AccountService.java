package com.example.asm_java6.Service;



import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Model.Product;

import java.util.List;

public interface AccountService {
    List<Account> findAll();

    Account findAccountsByUsername(String username);

    void save(Account acc);

    void deleteAcc(String username);

    Account updateAcc(String username, Account account);

    List<Account> findListAccountsByUsername(String username);

    List<Account> findAllByRole(String role);
}
