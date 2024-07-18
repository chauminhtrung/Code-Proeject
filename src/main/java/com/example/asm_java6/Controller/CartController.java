package com.example.asm_java6.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CartController {
    @RequestMapping("/cart/view")
    public String viewCart() {
        return "cart/view";
    }
}
