package com.wedspot.backend.services;

import com.wedspot.backend.Model.Entity.Booking;
import java.util.List;
import java.util.Optional;

public interface IBookingService {
    List<Booking> getAllBookings();
    List<Booking> getBookingsByClient(Long clientId);
    List<Booking> getBookingsByVendor(Long vendorId);
    Booking createBooking(Booking booking);
    Optional<Booking> updateBookingStatus(Long id, String status);
}
