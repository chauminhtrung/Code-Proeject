package com.example.asm_java6.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Categoriedetails")
public class CategoryDetail {
    @Id
    String id;
    String name;
    @ManyToOne
    @JoinColumn(name = "Idcate")
    Category category;
    @JsonIgnore
    @OneToMany(mappedBy = "categoryde")
    List<Product> products;
}
