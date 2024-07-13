package com.example.asm_java6.API;

import com.example.asm_java6.Service.ProductService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-product")
public class ProductAPI {

  @Autowired
  private ProductService productService;
  @GetMapping("/get-all-product")
  public ResponseEntity<?> getAllProduct(){
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data",productService.findAll());
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }
  @GetMapping("/findProductById")
  public ResponseEntity<?> findProductById(@RequestParam("id" ) String id) {
    Map<String, Object> rs = new HashMap();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", productService.findProductById(id));
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
    }
    return ResponseEntity.ok(rs);
  }
}
