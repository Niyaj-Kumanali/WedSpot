package com.wedspot.backend.controller;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.LoginRequest;
import com.wedspot.backend.Model.LoginResponse;
import com.wedspot.backend.Model.RegisterRequest;
import com.wedspot.backend.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<APIResponse<LoginResponse>> login(@RequestBody @Valid LoginRequest request) {
        APIResponse<LoginResponse> response = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<APIResponse<LoginResponse>> register(@RequestBody @Valid RegisterRequest request) {
        APIResponse<LoginResponse> response = authService.register(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/logout/{id}")
    public ResponseEntity<APIResponse<Void>> logout(@PathVariable Long id) {
        APIResponse<Void> apiResponse = new APIResponse<>();
        apiResponse.setMessage("Successfully logged out");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
