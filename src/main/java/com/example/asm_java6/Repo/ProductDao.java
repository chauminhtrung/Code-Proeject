package com.example.asm_java6.Repo;


import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {

  @Query("select o from Product o where o.available = false order by NEWID() limit 8")
  List<Product> findAllRandom();

  List<Product> findAll();

  @Query("SELECT p FROM Product p JOIN p.categoryde cd JOIN cd.category c WHERE c.id = :categoryId")
  List<Product> findByCategoryId(@Param("categoryId") String categoryId);

  // Tìm tất cả các sản phẩm theo id của categoryDetail
  List<Product> findByCategorydeId(String categoryDetailId);

  @Query("SELECT p.name,ca.name,SUM(orDe.price) total  FROM Product p join CategoryDetail ca on\n" +
          "p.categoryde.id = ca.id join OrderDetail orDe on p.id = orDe.product.id\n" +
          "GROUP BY p.name,ca.name\n" +
          "ORDER BY total DESC\n")
  List<Object> SeleectReport();

  @Query("SELECT p.name,ca.name,SUM(orDe.price) total  FROM Product p join CategoryDetail ca on\n" +
          "p.categoryde.id = ca.id join OrderDetail orDe on p.id = orDe.product.id join Order ord on orDe.order.id = ord.id where MONTH(ord.createDate) = :month \n" +
          "GROUP BY p.name,ca.name\n")
  List<Object> SeleectReportMonth(int month);
  
}
