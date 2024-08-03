package com.example.asm_java6.Repo;

import com.example.asm_java6.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountDao extends JpaRepository<Account, Integer> {
    Account findAccountsByUsername(String username);

    @Query("SELECT a FROM Account a WHERE a.username like %:username%")
    List<Account> findListAccountsByUsername(String username);

    @Query("SELECT a FROM Account a JOIN Authority au on a.username = au.account.username JOIN Role r on au.role.id = r.id WHERE r.name =:role ")
    List<Account> findListAccountsByRole(String role);

}
