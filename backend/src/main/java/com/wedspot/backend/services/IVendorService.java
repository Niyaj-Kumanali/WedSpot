package com.wedspot.backend.services;

import java.util.List;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.VendorServiceDTO;
import com.wedspot.backend.Model.VendorServiceRequest;

public interface IVendorService {

    APIResponse<Void> createVendorService(VendorServiceRequest request);

    APIResponse<VendorServiceDTO> updateVendorService(Long id, VendorServiceRequest request);

    APIResponse<Void> deleteVendorService(Long id);

    APIResponse<VendorServiceDTO> getVendorService(Long id);

    APIResponse<List<VendorServiceDTO>> getAllVendorServices();

    APIResponse<List<VendorServiceDTO>> getAllVendorServices(Long id);

    APIResponse<List<VendorServiceDTO>> getAllClientVendorServices(Long id);
}
