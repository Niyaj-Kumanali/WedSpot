package com.wedspot.backend.services;

import com.wedspot.backend.Model.*;

public interface IAuthService {
    APIResponse login(LoginRequest request);
    APIResponse register(RegisterRequest request);
    APIResponse getAllUsers();
    APIResponse getUser(Long id);
    
    // Management & Security
    APIResponse forgotPassword(ForgotPasswordRequest request);
    APIResponse resetPassword(ResetPasswordRequest request);
    APIResponse verifyOtp(VerifyOtpRequest request);
    APIResponse verifyToken(String token);
    APIResponse logout(String token);
}
