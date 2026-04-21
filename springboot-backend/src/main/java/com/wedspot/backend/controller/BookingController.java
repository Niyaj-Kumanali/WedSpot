package com.wedspot.backend.controller;

import com.wedspot.backend.Model.Entity.Booking;
import com.wedspot.backend.services.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final IBookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Booking>> getBookingsByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(bookingService.getBookingsByClient(clientId));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Booking>> getBookingsByVendor(@PathVariable Long vendorId) {
        return ResponseEntity.ok(bookingService.getBookingsByVendor(vendorId));
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        return bookingService.updateBookingStatus(id, statusMap.get("status"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
