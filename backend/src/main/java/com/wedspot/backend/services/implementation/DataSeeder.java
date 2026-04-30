package com.wedspot.backend.services.implementation;

import tools.jackson.databind.ObjectMapper;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.Entity.VendorService;
import com.wedspot.backend.Model.VendorServiceRequest;
import com.wedspot.backend.mappers.IVendorServiceMapper;
import com.wedspot.backend.repository.IAuthRepository;
import com.wedspot.backend.repository.IVendorServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;

import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final IAuthRepository authRepository;
    private final IVendorServiceRepository serviceRepository; // You'll need this

    private final IVendorServiceMapper vendorServiceMapper;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) {
        SeedUsers();
        seedServices();
    }

    public void SeedUsers() {
        String defaultPassword = passwordEncoder.encode("1234567890");
        String defaultPhone = "1234567890";

        // Seed Admin
        seedIfNotExists(createUser("Admin Kumar", "admin@gmail.com", defaultPassword, "Admin", defaultPhone, "India"));

        // Seed other roles
        List<String[]> roles = Arrays.asList(
                new String[] { "Manager", "manager" },
                new String[] { "Staff", "staff" },
                new String[] { "Vendor", "vendor" },
                new String[] { "Client", "client" });

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

    private void seedServices() {
        try {
            InputStream inputStream = getClass().getResourceAsStream("/services.json");

            if (inputStream == null) {
                log.warn("Cannot read services.json from resources.");
            }

            List<VendorServiceRequest> requests = objectMapper.readValue(inputStream,
                    new TypeReference<List<VendorServiceRequest>>() {
                    });

            int totalServices = 0;

            for (VendorServiceRequest request : requests) {

                VendorService entity = vendorServiceMapper.toEntity(request);

                Optional<User> vendor = authRepository.findByEmail("vendor1@gmail.com");

                if (vendor.isPresent()) {
                    if (serviceRepository.existsByNameAndVendor(request.getName(), vendor.get())) {
                        log.info("The service {} is already exists by {}", request.getName(), vendor.get().getEmail());
                        continue;
                    }

                    entity.setVendor(vendor.get());
                    // 4. Save to DB
                    serviceRepository.save(entity);

                    totalServices++;
                }
            }

            log.info("Successfully seeded {} services from JSON.", totalServices);

        } catch (Exception e) {
            log.error("Failed to seed services: {} ", e.getMessage());
        }
    }

    private void seedIfNotExists(User user) {
        authRepository.findByEmail(user.getEmail())
                .ifPresentOrElse(
                        existing -> log.debug("User already exists: {}", user.getEmail()),
                        () -> {
                            authRepository.save(user);
                            log.info("Seeded user: {}", user.getEmail());
                        });
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