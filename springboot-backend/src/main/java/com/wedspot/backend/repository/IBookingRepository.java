package com.wedspot.backend.repository;

import com.wedspot.backend.Model.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByClientId(Long clientId);
    List<Booking> findByVendorId(Long vendorId);
    List<Booking> findByStatus(String status);
}
