package com.example.asm_java6.Controller;

import com.example.asm_java6.Repo.AccountDao;
import com.example.asm_java6.Model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CartController {
    @Autowired
    AccountDao accountDao;

    @RequestMapping("/cart/view")
    public String viewCart(Model model, Authentication auth) {
        String userEmail = auth.getName();
        Account account = accountDao.findAccountsByUsername(userEmail);
        model.addAttribute("orders", account);
        return "cart/view";
    }


}
