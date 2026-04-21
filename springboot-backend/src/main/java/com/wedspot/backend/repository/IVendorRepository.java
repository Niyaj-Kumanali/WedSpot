package com.wedspot.backend.repository;

import com.wedspot.backend.Model.Entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IVendorRepository extends JpaRepository<Vendor, Long> {
    List<Vendor> findByCategory(String category);
    List<Vendor> findByPremiumTrue();
}
