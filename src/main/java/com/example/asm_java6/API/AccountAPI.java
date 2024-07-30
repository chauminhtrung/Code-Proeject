package com.example.asm_java6.API;

import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Model.Cart;
import com.example.asm_java6.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api-accounts")
public class AccountAPI {
    @Autowired
    AccountService accountService;

    @GetMapping("/get-all-account")
    public ResponseEntity<?> getAllAccount() {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findAll());
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            ex.printStackTrace();
        }
        return ResponseEntity.ok(rs);
    }

    @GetMapping("/get-account/{username}")
    public ResponseEntity<?> getAccount(@PathVariable String username) {
        Account ac = accountService.findAccountsByUsername(username);
        // Lấy danh sách giỏ hàng theo tên người dùng
        if (ac != null) {
            return ResponseEntity.ok(ac);
        }
        // Trả về mã trạng thái HTTP 404 (Not Found) và thông báo lỗi tương ứng
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
    }

}
