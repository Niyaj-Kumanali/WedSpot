package com.wedspot.backend.controller;


import com.wedspot.backend.Model.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<?> getHealth() {
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Healthy");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
