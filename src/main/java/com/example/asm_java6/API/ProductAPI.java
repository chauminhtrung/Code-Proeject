package com.example.asm_java6.API;

import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Service.CategoryService;
import com.example.asm_java6.Service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

  @GetMapping("/edit-product")
  public ResponseEntity<?> getProductByIdManager(@RequestParam("id") Integer id) {
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

  @PostMapping("/add-product")
  public ResponseEntity<?> addProduct(@RequestBody Product product) {
    Map<String, Object> rs = new HashMap<>();
    try {
      Product createdProduct = productService.addProduct(product);
      rs.put("status", true);
      rs.put("message", "Call api success");
      rs.put("data", createdProduct);
      return ResponseEntity.status(HttpStatus.CREATED).body(rs);
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed: " + ex.getMessage());
      rs.put("data", null);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs);
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
    Map<String, Object> rs = new HashMap<>();
    try {
      productService.deleteProduct(id); // Gọi phương thức xóa sản phẩm
      rs.put("status", true);
      rs.put("message", "Product deleted successfully");
      rs.put("data", null); // Không có dữ liệu trả về
    } catch (EntityNotFoundException ex) {
      rs.put("status", false);
      rs.put("message", "Product not found");
      rs.put("data", null);
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(rs); // Trả về mã 404 nếu không tìm thấy
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Call api failed: " + ex.getMessage());
      rs.put("data", null);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(rs); // Trả về mã 500 nếu có lỗi
    }
    return ResponseEntity.ok(rs); // Trả về mã 200 cho thành công
  }

  @PutMapping("/update-product/{id}")
  public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
    Map<String, Object> rs = new HashMap<>();
    try {
      Product updatedProduct = productService.updateProduct(id, product);
      rs.put("status", true);
      rs.put("message", "Update product successful");
      rs.put("data", updatedProduct);
      return ResponseEntity.ok(rs); // Trả về mã trạng thái 200 OK
    } catch (EntityNotFoundException ex) {
      rs.put("status", false);
      rs.put("message", "Product not found: " + ex.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã trạng thái 404 Not Found
    } catch (Exception ex) {
      rs.put("status", false);
      rs.put("message", "Update product failed: " + ex.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs); // Trả về mã trạng thái 500 Internal Server Error
    }
  }
}
