package com.example.asm_java6.Service;



import com.example.asm_java6.Model.Account;
import com.example.asm_java6.Model.Product;

import java.util.List;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface AccountService {
    List<Account> findAll();

    Account findAccountsByUsername(String username);

    void save(Account acc);

    void deleteAcc(String username);

    Account updateAcc(String username, Account account);

    List<Account> findListAccountsByUsername(String username);

    List<Account> findAllByRole(String role);

    void loginOAuth2(OAuth2AuthenticationToken oAuth2Token);
}
