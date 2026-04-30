package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.BookingDTO;
import com.wedspot.backend.Model.BookingRequest;
import com.wedspot.backend.Model.Entity.Booking;
import com.wedspot.backend.Model.Entity.ServiceBooking;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.Entity.VendorService;
import com.wedspot.backend.mappers.IBookingMapper;
import com.wedspot.backend.repository.IBookingRepository;
import com.wedspot.backend.repository.IUserRepository;
import com.wedspot.backend.repository.IVendorServiceRepository;
import com.wedspot.backend.services.IBookingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BookingService implements IBookingService {

    private final IBookingRepository bookingRepository;
    private final IBookingMapper bookingMapper;
    private final IUserRepository userRepository;
    private final IVendorServiceRepository vendorServiceRepository;

    @Override
    public APIResponse<List<BookingDTO>> getAllBookings() {
        List<Booking> allBookings = bookingRepository.findAll();
        if (allBookings.isEmpty()) {
            APIResponse<List<BookingDTO>> apiResponse = new APIResponse<>();
            apiResponse.setMessage("No bookings found");
            apiResponse.setData(Collections.emptyList());
            return apiResponse;
        }
        List<BookingDTO> allBookingDTOs = allBookings.stream().map(bookingMapper::toDTO).toList();

        APIResponse<List<BookingDTO>> apiResponse = new APIResponse<>();
        apiResponse.setMessage("All bookings fetched successfully");
        apiResponse.setData(allBookingDTOs);
        return apiResponse;
    }

    @Override
    public APIResponse<List<BookingDTO>> getClientBookings(Long clientId) {
        List<Booking> allBookings = bookingRepository.findByClientId(clientId);
        if (allBookings.isEmpty()) {
            APIResponse<List<BookingDTO>> apiResponse = new APIResponse<>();
            apiResponse.setMessage("No bookings found");
            apiResponse.setData(Collections.emptyList());
            return apiResponse;
        }
        List<BookingDTO> allBookingDTOs = allBookings.stream().map(bookingMapper::toDTO).toList();

        APIResponse<List<BookingDTO>> apiResponse = new APIResponse<>();
        apiResponse.setMessage("All bookings fetched successfully");
        apiResponse.setData(allBookingDTOs);
        return apiResponse;
    }

    @Override
    public APIResponse<List<BookingDTO>> getVendorBookings(Long vendorId) {
        List<Booking> allBookings = bookingRepository.findByVendorId(vendorId);

        if (allBookings.isEmpty()) {
            APIResponse<List<BookingDTO>> apiResponse = new APIResponse<>();
            apiResponse.setMessage("No bookings found");
            apiResponse.setData(Collections.emptyList());
            return apiResponse;
        }
        List<BookingDTO> allBookingDTOs = allBookings.stream().map(bookingMapper::toDTO).toList();

        APIResponse<List<BookingDTO>> apiResponse = new APIResponse<>();
        apiResponse.setMessage("All bookings fetched successfully");
        apiResponse.setData(allBookingDTOs);
        return apiResponse;
    }

    @Override
    public APIResponse<BookingDTO> createBooking(BookingRequest request) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User client = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Booking booking = new Booking();
        booking.setClient(client);
        booking.setEventDate(request.getEventDate());
        booking.setEventLocation(request.getEventLocation());
        booking.setGuestCount(request.getGuestCount());
        booking.setNotes(request.getNotes());
        booking.setStatus(Booking.BookingStatus.PENDING);

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<ServiceBooking> bookingServices = new ArrayList<>();

        if (request.getServiceIds() != null) {
            for (Long serviceId : request.getServiceIds()) {
                if (serviceId == null) continue; // Skip invalid IDs
                
                VendorService vendorService = vendorServiceRepository.findById(serviceId)
                        .orElseThrow(() -> new RuntimeException("Service not found with ID: " + serviceId));

                ServiceBooking bs = new ServiceBooking();
                bs.setBooking(booking);
                bs.setService(vendorService);
                bs.setPrice(vendorService.getPrice());
                bs.setQuantity(1); // Default quantity
                bs.setStatus(ServiceBooking.Status.PENDING);

                bookingServices.add(bs);
                totalAmount = totalAmount.add(bs.getPrice());
            }
        }

        booking.setServiceBookings(bookingServices);
        booking.setTotalAmount(totalAmount);
        booking.setAdvancePaid(BigDecimal.ZERO);

        Booking savedBooking = bookingRepository.save(booking);

        APIResponse<BookingDTO> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Booking created successfully");
        apiResponse.setData(bookingMapper.toDTO(savedBooking));
        apiResponse.setOk(true);
        return apiResponse;
    }
}
