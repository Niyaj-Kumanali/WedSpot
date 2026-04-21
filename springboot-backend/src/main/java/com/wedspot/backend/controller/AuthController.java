package com.wedspot.backend.controller;

import com.wedspot.backend.Model.*;
import com.wedspot.backend.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping("/forgot-password")
    public ResponseEntity<APIResponse> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        APIResponse response = authService.forgotPassword(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<APIResponse> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
        APIResponse response = authService.resetPassword(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<APIResponse> verifyOtp(@RequestBody @Valid VerifyOtpRequest request) {
        APIResponse response = authService.verifyOtp(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/verify-token")
    public ResponseEntity<APIResponse> verifyToken(@RequestBody Map<String, String> payload) {
        APIResponse response = authService.verifyToken(payload.get("token"));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<APIResponse> logout(@RequestHeader("Authorization") String token) {
        APIResponse response = authService.logout(token);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/users")
    public ResponseEntity<APIResponse> getAllUsers() {
        APIResponse response = authService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<APIResponse> getUser(@PathVariable Long id) {
        APIResponse response = authService.getUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
