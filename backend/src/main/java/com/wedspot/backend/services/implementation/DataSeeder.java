package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.repository.IAuthRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSeeder {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final IAuthRepository authRepository;


    @PostConstruct
    public void seedUsers() {
        String defaultPassword = passwordEncoder.encode("1234567890");
        String defaultPhone = "1234567890";

        List<User> usersToSeed = Arrays.asList(
                createUser("Admin Kumar", "admin@gmail.com", defaultPassword, "Admin", defaultPhone, "India"),
                createUser("Manager Singh", "manager@gmail.com", defaultPassword, "Manager", defaultPhone, "India"),
                createUser("Staff Raj", "staff@gmail.com", defaultPassword, "Staff", defaultPhone, "India"),
                createUser("Vendor Mehta", "vendor@gmail.com", defaultPassword, "Vendor", defaultPhone, "India"),
                createUser("Client Sharma", "client@gmail.com", defaultPassword, "Client", defaultPhone, "India")
        );

        for (User user : usersToSeed) {
            // Check if user exists using JPA (blocking)
            if (authRepository.findByEmail(user.getEmail()).isEmpty()) {
                authRepository.save(user);
                System.out.println("Seeded user: " + user.getEmail());
            }
        }
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
