package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.Entity.Booking;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.Entity.VendorService;
import com.wedspot.backend.Model.VendorServiceDTO;
import com.wedspot.backend.Model.VendorServiceRequest;
import com.wedspot.backend.exception.ResourceNotFoundException;
import com.wedspot.backend.mappers.IVendorServiceMapper;
import com.wedspot.backend.repository.IBookingRepository;
import com.wedspot.backend.repository.IUserRepository;
import com.wedspot.backend.repository.IVendorServiceRepository;
import com.wedspot.backend.services.IVendorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class VendorServiceService implements IVendorService {

    private final IVendorServiceMapper vendorServiceMapper;

    private final IVendorServiceRepository vendorServiceRepository;

    private final IBookingRepository bookingRepository;

    private final IUserRepository userRepository;

    @Override
    public APIResponse<Void> createVendorService(VendorServiceRequest request) {
        VendorService vendorService = vendorServiceMapper.toEntity(request);

        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
        User vendor = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        vendorService.setVendor(vendor);

        log.info("creating service: {}", vendorService);

        vendorServiceRepository.save(vendorService);

        APIResponse<Void> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Service created successfully");
        return apiResponse;
    }

    @Override
    public APIResponse<VendorServiceDTO> updateVendorService(Long id, VendorServiceRequest request) {
        VendorService fetchedVendorService = vendorServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        vendorServiceMapper.updateEntityFromRequest(request, fetchedVendorService);

        VendorService savedVendorService = vendorServiceRepository.save(fetchedVendorService);
        VendorServiceDTO savedVendorServiceDTO = vendorServiceMapper.toDTO(savedVendorService);

        APIResponse<VendorServiceDTO> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Service updated successfully");
        apiResponse.setData(savedVendorServiceDTO);

        return apiResponse;
    }

    @Override
    public APIResponse<Void> deleteVendorService(Long id) {
        VendorService fetchedVendorService = vendorServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        vendorServiceRepository.delete(fetchedVendorService);

        APIResponse<Void> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Service deleted successfully");

        return apiResponse;
    }

    @Override
    public APIResponse<VendorServiceDTO> getVendorService(Long id) {
        VendorService fetchedVendorService = vendorServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        VendorServiceDTO fetchedVendorServiceDTO = vendorServiceMapper.toDTO(fetchedVendorService);

        APIResponse<VendorServiceDTO> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Service retrieved successfully");
        apiResponse.setData(fetchedVendorServiceDTO);

        return apiResponse;
    }

    @Override
    public APIResponse<List<VendorServiceDTO>> getAllVendorServices() {
        List<VendorService> allVendorServices = vendorServiceRepository.findAll();

        List<VendorServiceDTO> allVendorServiceDTOs = allVendorServices.stream().map(vendorServiceMapper::toDTO)
                .toList();

        APIResponse<List<VendorServiceDTO>> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Services retrieved successfully");
        apiResponse.setData(allVendorServiceDTOs);

        return apiResponse;
    }

    @Override
    public APIResponse<List<VendorServiceDTO>> getAllVendorServices(Long id) {
        List<VendorService> allVendorServices = vendorServiceRepository.findByVendorId(id);
        List<VendorServiceDTO> allVendorServiceDTOs = allVendorServices.stream().map(vendorServiceMapper::toDTO)
                .toList();
        APIResponse<List<VendorServiceDTO>> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Services retrieved successfully");
        apiResponse.setData(allVendorServiceDTOs);

        return apiResponse;
    }

    @Override
    public APIResponse<List<VendorServiceDTO>> getAllClientVendorServices(Long id) {
        List<Booking> allClientBookings = bookingRepository.findByClientId(id);

        List<VendorService> allClientBookedVendorServices = allClientBookings.stream()
                .flatMap(booking -> booking.getServiceBookings().stream()
                        .map(sb -> sb.getService()))
                .toList();

        List<VendorServiceDTO> allVendorServiceDTOs = allClientBookedVendorServices.stream()
                .map(vendorServiceMapper::toDTO).toList();

        APIResponse<List<VendorServiceDTO>> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Services retrieved successfully");
        apiResponse.setData(allVendorServiceDTOs);

        return apiResponse;
    }

}
