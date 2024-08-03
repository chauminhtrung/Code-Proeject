package com.example.asm_java6.Controller;

import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Model.Authority;
import com.example.asm_java6.Model.Role;
import com.example.asm_java6.Service.AccountService;
import com.example.asm_java6.Service.AuthorityService;
import jakarta.validation.Valid;
import org.apache.catalina.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ManagerController {
    @Autowired
    AccountService accountService;
    @Autowired
    AuthorityService authorityService;

    @RequestMapping("/manager")
    public String manager(Model model) {
        model.addAttribute("message","Admin Manager");
        return "manager/index";
    }

    @RequestMapping("/manager/ManagerProducts")
    public String managerProducts(Model model) {
        model.addAttribute("option","Edit Product");
        return "manager/ManagerProducts";
    }

    @RequestMapping("/manager/Accounts")
    public String managerAccounts(Model model) {
        model.addAttribute("option","Edit Account");
        return "manager/ManagerAccounts";
    }

    @RequestMapping("/manager/Orders")
    public String managerOrders(Model model) {
        model.addAttribute("option","Edit Order");
        return "manager/ManagerOrders";
    }

    @RequestMapping("/manager/Authorities")
    public String managerAuthorities(Model model) {
        model.addAttribute("option","Edit Authority");
        return "manager/ManagerAuthorities";
    }

    //    EDIT Product
    @RequestMapping("/edit/id")
    public String edit(@RequestParam("id") Integer id,Model model) {
        model.addAttribute("option","Edit Product");
        return "forward:/manager/ManagerProducts";
    }
    //    ADD Product
    @RequestMapping("/manager/EditProducts")
    public String AddProduct(Model model) {
        model.addAttribute("option","Edit Product");
        return "manager/AddProduct";
    }

    //    EDIT Account
    @RequestMapping("/manager/EditAccount")
    public String EditAccount(Model model) {
        Account account = new Account();
        model.addAttribute(account);
        model.addAttribute("option","Edit Account");
        return "/manager/EditAccount";
    }

    @RequestMapping("/manager/EditAccount/username")
    public String detail(@RequestParam("username") String username) {
        return "/manager/EditAccount";
    }

    // add
    @PostMapping("/manager/EditAccount")
    public String register(Model model, @Valid @ModelAttribute Account account, BindingResult bindingResult) {
        Account ac = accountService.findAccountsByUsername(account.getUsername());
        if(ac != null) {
            bindingResult.addError(new FieldError("account", "username","Username is already in use"));
        }

        if(bindingResult.hasErrors()) {
            return "/manager/EditAccount";
        }

        try {
            var bCrypt = new BCryptPasswordEncoder();
            Authority authority = new Authority();
            Role role = new Role();
            role.setId("CUST");
            role.setName("Customers");
            Account ACC = new Account();
            ACC.setUsername(account.getUsername());
            ACC.setPassword(bCrypt.encode(account.getPassword()));
            ACC.setFullname(account.getFullname());
            ACC.setEmail(account.getEmail());
            ACC.setPhoto("user.png");
            accountService.save(ACC);
            authority.setAccount(ACC);
            authority.setRole(role);
            authorityService.save(authority);
            model.addAttribute("account", new Account());
            model.addAttribute("success", true);

        }catch (Exception e) {
            bindingResult.addError(new FieldError("account", "fullname",e.getMessage()));
        }

        return "/manager/EditAccount";
    }


}