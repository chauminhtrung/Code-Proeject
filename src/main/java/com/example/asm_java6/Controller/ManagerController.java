package com.example.asm_java6.Controller;

import org.apache.catalina.Manager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ManagerController {
    @RequestMapping("/manager")
    public String manager(Model model) {
        model.addAttribute("message","Admin Manager");
        return "manager/index";
    }

    @RequestMapping("/manager/ManagerProducts")
    public String managerProducts(Model model) {
        return "manager/ManagerProducts";
    }

    @RequestMapping("/manager/Accounts")
    public String managerAccounts(Model model) {
        return "manager/ManagerAccounts";
    }

    @RequestMapping("/manager/Orders")
    public String managerOrders(Model model) {
        return "manager/ManagerOrders";
    }

    @RequestMapping("/manager/Authorities")
    public String managerAuthorities(Model model) {
        return "manager/ManagerAuthorities";
    }

//    EDIT Product
    @RequestMapping("/edit/id")
    public String edit(@RequestParam("id") Integer id) {
        return "forward:/manager/ManagerProducts";
    }
//    ADD Product
    @RequestMapping("/manager/EditProducts")
    public String AddProduct(Model model) {
        return "manager/EditProduct";
    }
}
