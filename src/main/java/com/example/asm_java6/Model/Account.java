package com.example.asm_java6.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Accounts")
public class Account  implements Serializable{
    @Id
    @NotEmpty( message = "Must Not Be Empty")
    String username;
    @Size(min = 6, message = "Minimum Password length is 6 charater")
    String password;
    @NotEmpty( message = " Must Not Be Empty")
    String fullname;
    @NotEmpty( message = "Must Not Be Empty")
    @Email
    String email;
    String photo;
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    List<Order> orders;
    @JsonIgnore
    @OneToMany(mappedBy = "account", fetch = FetchType.EAGER)
    List<Authority> authorities;
}
