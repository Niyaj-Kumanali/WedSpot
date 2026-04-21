package com.wedspot.backend.services.implementation;

import com.wedspot.backend.services.IDashboardService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService implements IDashboardService {

    private final EntityManager entityManager;

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            Long totalVendors = (Long) entityManager.createNativeQuery("SELECT COUNT(*) FROM vendors").getSingleResult();
            Long totalBookings = (Long) entityManager.createNativeQuery("SELECT COUNT(*) FROM bookings").getSingleResult();
            Long totalUsers = (Long) entityManager.createNativeQuery("SELECT COUNT(*) FROM users").getSingleResult();
            
            stats.put("totalVendors", totalVendors);
            stats.put("totalBookings", totalBookings);
            stats.put("totalUsers", totalUsers);
            stats.put("revenue", 4520000); // Mock revenue logic for now
        } catch (Exception e) {
            stats.put("error", "Could not fetch stats: " + e.getMessage());
        }

        return stats;
    }
}
