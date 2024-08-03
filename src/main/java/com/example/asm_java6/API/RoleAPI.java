package com.example.asm_java6.API;


import com.example.asm_java6.Model.Authority;
import com.example.asm_java6.Service.AccountService;
import com.example.asm_java6.Service.AuthorityService;
import com.example.asm_java6.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api-roles")
public class RoleAPI {
    @Autowired
    AccountService accountService;
    @Autowired
    AuthorityService authorityService;
    @Autowired
    RoleService roleService;

    @GetMapping("/rest/authorities")
    public Map<String,Object> getAllAuthoritries(Model model) {
        Map<String,Object> data = new HashMap<>();
        data.put("authorities",authorityService.findAll());
        data.put("roles",roleService.findAll());
        data.put("accounts",accountService.findAll());
        return data;
    }

    @GetMapping("/rest/authoritiesbyR")
    public Map<String,Object> getAllAuthoritriesWRole(@RequestParam("role") String role,Model model) {
        Map<String,Object> data = new HashMap<>();
        data.put("authorities",authorityService.findAll());
        data.put("roles",roleService.findAll());
        data.put("accounts",accountService.findAllByRole(role));
        return data;
    }

    @GetMapping("/rest/authoritiesbyU")
    public Map<String,Object> getAllAuthoritriesWUs(@RequestParam("username") String username,Model model) {
        Map<String,Object> data = new HashMap<>();
        data.put("authorities",authorityService.findAll());
        data.put("roles",roleService.findAll());
        data.put("accounts",accountService.findListAccountsByUsername(username));
        return data;
    }

    @PostMapping("/rest/authorities")
    public Authority createAuthoritrie(@RequestBody Authority authortie) {
        return authorityService.saveA(authortie);
    }

    @DeleteMapping("/rest/authorities/{id}")
    public void deleteAuthoritrie(@PathVariable int id) {
        authorityService.deleteById(id);
    }


}
