package com.wedspot.auth.controller;

import com.wedspot.auth.Model.APIResponse;
import com.wedspot.auth.Model.LoginRequest;
import com.wedspot.auth.Model.RegisterRequest;
import com.wedspot.auth.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<APIResponse> login(@RequestBody @Valid LoginRequest request) {
        APIResponse response = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<APIResponse> register(@RequestBody @Valid RegisterRequest request) {
        APIResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/users")
    public ResponseEntity<APIResponse> getAllUsers() {
        APIResponse response = authService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
