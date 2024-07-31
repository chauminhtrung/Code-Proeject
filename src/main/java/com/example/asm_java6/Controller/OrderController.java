package com.example.asm_java6.Controller;

import com.example.asm_java6.Repo.AccountDao;
import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {
    @Autowired
    AccountDao accountDao;

    @Autowired
    OrderService orderService;

    @RequestMapping("/order/list")
    public String orderlist(Model model, HttpServletRequest request) {
        String Username = request.getRemoteUser();
        model.addAttribute("orders", orderService.findOrderByAccount_Username(Username));
        return "cart/orderlist";
    }
}
