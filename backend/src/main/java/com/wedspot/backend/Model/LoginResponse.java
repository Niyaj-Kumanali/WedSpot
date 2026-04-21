package com.wedspot.backend.Model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginResponse {
    private Long id;
    private String token;
    private String refreshToken;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
