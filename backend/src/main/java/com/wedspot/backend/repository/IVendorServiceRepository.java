package com.wedspot.backend.repository;

import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.Entity.VendorService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IVendorServiceRepository extends JpaRepository<VendorService, Long> {

    List<VendorService> findByVendorId(Long id);

    boolean existsByVendorId(Long id);

    boolean existsByNameAndVendor(String name, User vendor);
}
