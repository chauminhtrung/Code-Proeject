package com.example.asm_java6.API;

import com.example.asm_java6.Service.CategoryService;
import com.example.asm_java6.Service.ProductService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-product")
public class ProductAPI {

  @Autowired
  private ProductService productService;
  @Autowired
  private CategoryService categoryService;

  @GetMapping("/get-all-product")
  public ResponseEntity<?> getAllProduct() {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", productService.findAll());
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }

  @GetMapping("/get-all-random")
  public ResponseEntity<?> getAllRandom() {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", productService.findAllRandom());
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }

  @GetMapping("/detail-product")
  public ResponseEntity<?> getProductById(@RequestParam("id") Integer id) {
    Map<String, Object> rs = new HashMap<>();
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

  @GetMapping("/get-all-category")
  public ResponseEntity<?> getAllcategory() {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", categoryService.findAll());
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }

  @GetMapping("/products-categoryId")
  public ResponseEntity<?> getProductsByCategoryId(@RequestParam("categoryId") String categoryId) {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", productService.getProductsByCategoryId(categoryId));
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
    }
    return ResponseEntity.ok(rs);
  }
}
