package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.repository.IAuthRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
@Lazy(false)
public class DataSeeder {

    private final PasswordEncoder passwordEncoder;
    private final IAuthRepository authRepository;

    @PostConstruct
    public void init() {
        String defaultPassword = passwordEncoder.encode("1234567890");
        String defaultPhone = "1234567890";

        // Seed Admin
        seedIfNotExists(createUser("Admin Kumar", "admin@gmail.com", defaultPassword, "Admin", defaultPhone, "India"));

        // Seed other roles
        List<String[]> roles = Arrays.asList(
                new String[]{"Manager", "manager"},
                new String[]{"Staff", "staff"},
                new String[]{"Vendor", "vendor"},
                new String[]{"Client", "client"}
        );

        for (String[] roleEntry : roles) {
            String roleName = roleEntry[0];
            String roleKey = roleEntry[1];

            for (int i = 1; i <= 5; i++) {
                String name = roleName + " " + i;
                String email = roleKey + i + "@gmail.com";
                seedIfNotExists(createUser(name, email, defaultPassword, roleName, defaultPhone, "India"));
            }
        }
    }

    private void seedIfNotExists(User user) {
        authRepository.findByEmail(user.getEmail())
                .ifPresentOrElse(
                        existing -> log.debug("User already exists: {}", user.getEmail()),
                        () -> {
                            authRepository.save(user);
                            log.info("Seeded user: {}", user.getEmail());
                        }
                );
    }

    private User createUser(String name, String email, String password, String role, String phone, String address) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setPhoneNumber(phone);
        user.setAddress(address);
        user.setEnabled(true);
        return user;
    }
}