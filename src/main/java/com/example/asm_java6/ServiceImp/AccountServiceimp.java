package com.example.asm_java6.ServiceImp;


import com.example.asm_java6.Dao.AccountDao;
import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class AccountServiceimp implements AccountService, UserDetailsService {

    @Autowired
    AccountDao accountDao;



    @Override
    public List<Account> findAll() {
        return accountDao.findAll();
    }

    @Override
    public Account findAccountsByUsername(String username) {
        return accountDao.findAccountsByUsername(username);
    }

    @Override
    public void save(Account acc) {
        accountDao.save(acc);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account acc = accountDao.findAccountsByUsername(username);

        String[] roles = acc.getAuthorities().stream()
                .map(er -> er.getRole().getId())
                .collect(Collectors.toList()).toArray(new String[0]);
        if (acc != null) {
            var springUser = User.withUsername(acc.getUsername()).password(acc.getPassword()).roles(roles).build();
            System.out.println(springUser);
            return springUser;
        }
        return null;


    }
}
