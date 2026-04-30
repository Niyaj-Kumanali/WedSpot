package com.wedspot.backend.Model;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class BookingRequest {
    private LocalDate eventDate;
    private String eventLocation;
    private Integer guestCount;
    private String notes;
    private List<Long> serviceIds;
}
