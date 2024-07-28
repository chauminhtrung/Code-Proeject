package com.example.asm_java6.API;

import com.example.asm_java6.Dao.AccountDao;
import com.example.asm_java6.Dao.CartDao;
import com.example.asm_java6.Dao.ProductDao;
import com.example.asm_java6.Model.Account;

import com.example.asm_java6.Model.Cart;
import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api-carts")
public class CartAPI {
    @Autowired
    CartService cartService;

    @Autowired
    private CartDao cartDao;
    @Autowired
    private AccountDao accountDao;

    @Autowired
    private ProductDao productDao;


//    @PostMapping("/add-cart")
//    public ResponseEntity<?> addCart(@RequestParam("productId") int productId,
//                                     @RequestParam("qty") int quantity,
//                                     @RequestParam("username")String username) {
//        try {
//            cartService.addCart(productId, quantity,username);
//            return ResponseEntity.ok("Sussec");
//        }catch (Exception e) {
//            return ResponseEntity.ok("false");
//        }
//    }

    @GetMapping("getcart/{username}")
    public ResponseEntity<?> getCartByUser(@PathVariable String username) {
        List<Cart> cartItems = cartDao.findByAccount_Username(username);
        // Lấy danh sách giỏ hàng theo tên người dùng
        if (cartItems != null && !cartItems.isEmpty()) {
            return ResponseEntity.ok(cartItems);
        }
        // Trả về mã trạng thái HTTP 404 (Not Found) và thông báo lỗi tương ứng
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
    }

    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestParam Product product) {
        Account account = accountDao.findAccountsByUsername("tai");
        Product pro = productDao.findById(product.getId()).get();

        if (account != null) {
            Cart cartItem = new Cart();
            cartItem.setProduct(pro);
            cartItem.setAccount(account);
            cartItem.setQty(1); // Số lượng sản phẩm
            // Lưu giỏ hàng vào cơ sở dữ liệu
            Cart savedCartItem = cartDao.save(cartItem);
            return ResponseEntity.ok(savedCartItem);
        }
        // Trả về mã trạng thái HTTP 404 (Not Found) và thông báo lỗi tương ứng
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Call api failed");
    }

    @PutMapping("/cart/update/{cartId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Integer cartId, @RequestParam int quantity, @RequestParam String username) {
        Cart cartItem = cartDao.findById(cartId).orElse(null);
        Account account = accountDao.findAccountsByUsername(username);
        if (account != null) {
            if (cartItem != null) {
                cartItem.setQty(quantity);
                Cart updatedCartItem = cartDao.save(cartItem);
                return ResponseEntity.ok(updatedCartItem);
            }
        }
        // Trả về mã trạng thái HTTP 404 (Not Found) và thông báo lỗi tương ứng
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
    }

    @DeleteMapping("/cart/delete/{cartId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Integer cartId, @RequestParam String username) {
        Optional<Cart> cartItemOptional = cartDao.findById(cartId);
        Account account = accountDao.findAccountsByUsername(username);
        if (account != null) {
            if (cartItemOptional.isPresent()) {
                cartDao.deleteById(cartId);
                return ResponseEntity.ok().build();
            }
        }

        // Trả về mã trạng thái HTTP 404 (Not Found) và thông báo lỗi tương ứng
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
    }
}
