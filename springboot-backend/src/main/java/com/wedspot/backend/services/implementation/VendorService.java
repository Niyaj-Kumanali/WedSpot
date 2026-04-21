package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.Entity.Vendor;
import com.wedspot.backend.repository.IVendorRepository;
import com.wedspot.backend.services.IVendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VendorService implements IVendorService {

    private final IVendorRepository vendorRepository;

    @Override
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    @Override
    public Optional<Vendor> getVendorById(Long id) {
        return vendorRepository.findById(id);
    }

    @Override
    public List<Vendor> getVendorsByCategory(String category) {
        return vendorRepository.findByCategory(category);
    }

    @Override
    public List<Vendor> getPremiumVendors() {
        return vendorRepository.findByPremiumTrue();
    }

    @Override
    public Vendor createVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }
}
