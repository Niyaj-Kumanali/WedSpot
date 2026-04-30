package com.wedspot.backend.mappers;

import com.wedspot.backend.Model.BookingDTO;
import com.wedspot.backend.Model.Entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {IUserMapper.class}
)
public interface IBookingMapper {

    Booking toEntity(BookingDTO bookingDTO);
    BookingDTO toDTO(Booking booking);
}
