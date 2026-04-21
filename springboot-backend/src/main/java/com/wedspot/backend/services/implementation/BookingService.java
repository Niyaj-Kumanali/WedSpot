package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.Entity.Booking;
import com.wedspot.backend.repository.IBookingRepository;
import com.wedspot.backend.services.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final IBookingRepository bookingRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getBookingsByClient(Long clientId) {
        return bookingRepository.findByClientId(clientId);
    }

    @Override
    public List<Booking> getBookingsByVendor(Long vendorId) {
        return bookingRepository.findByVendorId(vendorId);
    }

    @Override
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Optional<Booking> updateBookingStatus(Long id, String status) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(status);
                    return bookingRepository.save(booking);
                });
    }
}
