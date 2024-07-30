package com.example.asm_java6.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @RequestMapping("/home")
    public String home() {
        return "home";
    }
    @RequestMapping("/detail/id")
    public String detail(@RequestParam("id") Integer id) {
        return "detail";
    }
}
