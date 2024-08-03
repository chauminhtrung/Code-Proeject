package com.example.asm_java6.ServiceImp;


import com.example.asm_java6.Model.Authority;
import com.example.asm_java6.Model.Product;
import com.example.asm_java6.Model.Role;
import com.example.asm_java6.Repo.AccountDao;
import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Repo.AuthDao;
import com.example.asm_java6.Service.AccountService;
import com.example.asm_java6.Service.AuthorityService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class AccountServiceimp implements AccountService, UserDetailsService {

  @Autowired
  AccountDao accountDao;

  @Autowired
  AuthDao authDao;

  @Autowired
  AuthorityService authorityService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public AccountServiceimp(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public List<Account> findAll() {
    return accountDao.findAll();
  }

  @Override
  public Account findAccountsByUsername(String username) {
    return accountDao.findAccountsByUsername(username);
  }

  @Override
  public void save(Account acc) {
    accountDao.save(acc);
  }

  @Override
  public void deleteAcc(String username) {
    Account acc = findAccountsByUsername(username);
    Authority au = authDao.findAuthorityByAccount_Username(username);
    if (au.getRole().getId().equals("CUST")) {
      accountDao.delete(acc);
    }
  }

  @Override
  public Account updateAcc(String username, Account account) {
    return accountDao.save(account);
  }

  @Override
  public List<Account> findListAccountsByUsername(String username) {
    return accountDao.findListAccountsByUsername(username);
  }

  @Override
  public List<Account> findAllByRole(String role) {
    return accountDao.findListAccountsByRole(role);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Account acc = accountDao.findAccountsByUsername(username);

    String[] roles = acc.getAuthorities().stream()
        .map(er -> er.getRole().getId())
        .collect(Collectors.toList()).toArray(new String[0]);
    if (acc != null) {
      var springUser = User.withUsername(acc.getUsername()).password(acc.getPassword()).roles(roles)
          .build();
      System.out.println(springUser);
      return springUser;
    }
    return null;
  }

  public void loginOAuth2(OAuth2AuthenticationToken oAuth2Token) {
    // Lấy email từ token OAuth2.
    String email = oAuth2Token.getPrincipal().getAttribute("email");

    // Tạo mật khẩu tạm thời
    String password = Long.toHexString(System.currentTimeMillis());

    // Tạo đối tượng UserDetails với tên người dùng là email, mật khẩu đã mã hóa và gán quyền là "GUEST".
    UserDetails user = User.withUsername(email)
        .password(this.passwordEncoder.encode(password)).roles("CUST").build();

    Authority authority = new Authority();
    Role role = new Role();
    role.setId("CUST");
    role.setName("Customers");
    Account ACC = new Account();
    ACC.setUsername(user.getUsername());
    ACC.setPassword(password);
    ACC.setFullname(user.getUsername());
    ACC.setEmail(email);
    ACC.setPhoto("user.png");
    save(ACC);
    authority.setAccount(ACC);
    authority.setRole(role);
    authorityService.save(authority);

    System.out.println(">>>>" + user);
    // Tạo đối tượng Authentication từ UserDetails và thiết lập nó vào SecurityContextHolder,
    // cho phép người dùng đã đăng nhập có quyền truy cập vào ứng dụng.
    Authentication auth = new UsernamePasswordAuthenticationToken(user, null,
        user.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(auth);
  }
}
