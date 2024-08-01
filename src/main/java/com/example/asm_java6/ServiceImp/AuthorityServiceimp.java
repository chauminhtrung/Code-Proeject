package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Model.Authority;
import com.example.asm_java6.Repo.AuthDao;
import com.example.asm_java6.Service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceimp implements AuthorityService {
    @Autowired
    AuthDao authDao;

    @Override
    public void save(Authority authority) {
        authDao.save(authority);
    }
}
