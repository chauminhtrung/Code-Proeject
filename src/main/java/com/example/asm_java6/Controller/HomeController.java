package com.example.asm_java6.Controller;


import com.example.asm_java6.Dao.ProductDao;
import com.example.asm_java6.Model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class HomeController {

    @RequestMapping("/home")
    public String home() {

        return "home";
    }
}
