package com.example.asm_java6.Controller;

import com.example.asm_java6.Repo.AccountDao;
import com.example.asm_java6.Model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {
    @Autowired
    AccountDao accountDao;

//    @RequestMapping("/cart/order")
//    public String oderCart(Model model, Authentication auth) {
//        String userEmail = auth.getName();
//        Account account = accountDao.findAccountsByUsername(userEmail);
//        model.addAttribute("orders", account);
//        return "cart/view";
//    }
    @RequestMapping("/order/detail/{id}")
    public String oderdetail(Model model, Authentication auth) {
        String userEmail = auth.getName();
        Account account = accountDao.findAccountsByUsername(userEmail);
        model.addAttribute("orders", account);
        return "order/orderDetail";
    }
    @RequestMapping("/order/list")
    public String orderlist() {
        return "order/orderlist";
    }
}
