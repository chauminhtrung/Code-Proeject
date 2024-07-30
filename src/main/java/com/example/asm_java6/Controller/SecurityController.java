package com.example.asm_java6.Controller;


import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {

    @Autowired
    AccountService accountService;


    @RequestMapping("/login")
    public String loginform() {
        return "form/login";
    }

    @RequestMapping("/security/login/error")
    public String loginerror(Model model) {
        model.addAttribute("loginError", true);
        model.addAttribute("message", "Sai thông tin đăng nhập !!");
        return "form/login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        Account account = new Account();
        model.addAttribute(account);
        model.addAttribute("success", false);
        return "form/register";
    }

    @PostMapping("/register")
    public String register(Model model, @Valid @ModelAttribute Account account, BindingResult bindingResult) {
        Account ac = accountService.findAccountsByUsername(account.getUsername());
        if(ac != null) {
            bindingResult.addError(new FieldError("account", "username","Username is already in use"));
        }

        if(bindingResult.hasErrors()) {
            return "form/register";
        }

        try {
            var bCrypt = new BCryptPasswordEncoder();
            Account ACC = new Account();
            ACC.setUsername(account.getUsername());
            ACC.setPassword(bCrypt.encode(account.getPassword()));
            ACC.setFullname(account.getFullname());
            ACC.setEmail(account.getEmail());
            ACC.setPhoto("user.png");
            accountService.save(ACC);

            model.addAttribute("account", new Account());
            model.addAttribute("success", true);

        }catch (Exception e) {
            bindingResult.addError(new FieldError("account", "fullname",e.getMessage()));
        }

        return "form/register";
    }

    @RequestMapping("/error/accedd-denied")
    public String loginerrorAs(Model model) {
        model.addAttribute("loginError", true);
        model.addAttribute("message", "Khong co quyen truy xuat !!");
        return "form/login";
    }



}
