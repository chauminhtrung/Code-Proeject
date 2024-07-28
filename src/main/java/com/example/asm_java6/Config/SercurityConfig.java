package com.example.asm_java6.Config;

import com.example.asm_java6.ServiceImp.JwtAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SercurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/order/**").authenticated()
                        .requestMatchers("/manager/**").hasAnyRole("STAF","DIRE")
                        .requestMatchers("/rest/authorities").hasRole("DIRE")
                        .anyRequest().permitAll()

                )

                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/form/login")
                        .defaultSuccessUrl("/home",true)
                        .failureUrl("/security/login/error")
                        .usernameParameter("username")
                        .passwordParameter("password")

                )

                .logout(config -> config.logoutSuccessUrl("/home"))
                .exceptionHandling((exception)-> exception.authenticationEntryPoint(new JwtAuthenticationEntryPoint()).accessDeniedPage("/error/accedd-denied"))
                .build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
