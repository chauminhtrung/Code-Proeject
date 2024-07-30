package com.example.asm_java6.API;

import com.example.asm_java6.Service.ProductManagerService;
import com.example.asm_java6.Service.ProductService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manager")
public class ProductManagerAPI {

  @Autowired
  private ProductManagerService productManagerService;

  @GetMapping("/get-all-product")
  public ResponseEntity<?> getAllProduct() {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", productManagerService.findAll());
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }
}
