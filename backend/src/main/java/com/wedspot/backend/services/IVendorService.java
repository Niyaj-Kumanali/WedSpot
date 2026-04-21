package com.wedspot.backend.services;

import com.wedspot.backend.Model.Entity.Vendor;
import java.util.List;
import java.util.Optional;

public interface IVendorService {
    List<Vendor> getAllVendors();
    Optional<Vendor> getVendorById(Long id);
    List<Vendor> getVendorsByCategory(String category);
    List<Vendor> getPremiumVendors();
    Vendor createVendor(Vendor vendor);
}
