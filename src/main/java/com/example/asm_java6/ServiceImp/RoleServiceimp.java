package com.example.asm_java6.ServiceImp;

import com.example.asm_java6.Model.Role;
import com.example.asm_java6.Repo.RoleDao;
import com.example.asm_java6.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceimp implements RoleService {
    @Autowired
    RoleDao roleDao;


    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }
}
