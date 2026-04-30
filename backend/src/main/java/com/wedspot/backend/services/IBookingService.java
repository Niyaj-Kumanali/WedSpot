package com.wedspot.backend.services;

import java.util.List;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.BookingDTO;

public interface IBookingService {
    APIResponse<List<BookingDTO>> getAllBookings();

    APIResponse<List<BookingDTO>> getClientBookings(Long clientId);

    APIResponse<List<BookingDTO>> getVendorBookings(Long vendorId);

    APIResponse<BookingDTO> createBooking(com.wedspot.backend.Model.BookingRequest request);
}
