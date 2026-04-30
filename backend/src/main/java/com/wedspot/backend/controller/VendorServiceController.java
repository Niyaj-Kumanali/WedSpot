package com.wedspot.backend.controller;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.VendorServiceDTO;
import com.wedspot.backend.Model.VendorServiceRequest;
import com.wedspot.backend.services.IVendorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
@Slf4j
public class VendorServiceController {

    private final IVendorService vendorService;

    @GetMapping
    public ResponseEntity<APIResponse<List<VendorServiceDTO>>> getAllVendorServices() {
        APIResponse<List<VendorServiceDTO>> response = vendorService.getAllVendorServices();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/vendor/{id}")
    public ResponseEntity<APIResponse<List<VendorServiceDTO>>> getAllVendorServices(@PathVariable long id) {
        APIResponse<List<VendorServiceDTO>> response = vendorService.getAllVendorServices(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<APIResponse<List<VendorServiceDTO>>> getAllClientsServices(@PathVariable long id) {
        APIResponse<List<VendorServiceDTO>> response = vendorService.getAllClientVendorServices(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<VendorServiceDTO>> getVendorService(@PathVariable long id) {
        APIResponse<VendorServiceDTO> response = vendorService.getVendorService(id);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<Void>> deleteVendorService(@PathVariable long id) {
        APIResponse<Void> response = vendorService.deleteVendorService(id);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse<VendorServiceDTO>> updateVendorService(@PathVariable long id,
            @RequestBody VendorServiceRequest request) {
        APIResponse<VendorServiceDTO> response = vendorService.updateVendorService(id, request);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<APIResponse<Void>> createVendorService(@RequestBody VendorServiceRequest request) {
        log.info("Received in the createVendorService {}", request);
        APIResponse<Void> response = vendorService.createVendorService(request);
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(response);
    }

}
