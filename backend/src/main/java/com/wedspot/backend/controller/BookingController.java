package com.wedspot.backend.controller;


import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.UpdatePasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/booking")
public class BookingController {

    public ResponseEntity<APIResponse> getAllBooking(){
        return  ResponseEntity.ok().body(new APIResponse());
    }
}
