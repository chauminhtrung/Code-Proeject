package com.example.asm_java6.API;

import com.example.asm_java6.Service.CategoryDetailService;
import com.example.asm_java6.Service.CategoryService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-category")
public class CategoryAPI {

  @Autowired
  private CategoryService categoryService;
  @Autowired
  private CategoryDetailService categoryDetailService;

  @GetMapping("/get-all-category")
  public ResponseEntity<?> getAllCategory() {
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

  @GetMapping("/category-detail")
  public ResponseEntity<?> getCategoryDetailsByCategoryId(@RequestParam String categoryId) {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Get category details successfully");
      rs.put("data", categoryDetailService.getCategoryDetailsByCategoryId(categoryId));
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Failed to get category details");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }

  @GetMapping("/get-all-categoryde")
  public ResponseEntity<?> getAllCategoryde() {
    Map<String, Object> rs = new HashMap<>();
    try {
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", categoryDetailService.findAll());
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed");
      rs.put("data", null);
      ex.printStackTrace();
    }
    return ResponseEntity.ok(rs);
  }


}
