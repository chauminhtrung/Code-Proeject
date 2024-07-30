package com.example.asm_java6.Controller;

import org.apache.catalina.Manager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

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

    //EDIT
    @RequestMapping("/manager/EditProducts")
    public String EditProducts(Model model) {
        return "manager/EditProduct";
    }


}
