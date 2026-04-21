package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.*;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.exception.ResourceAlreadyExistsException;
import com.wedspot.backend.exception.ResourceNotFoundException;
import com.wedspot.backend.mappers.UserMapper;
import com.wedspot.backend.repository.IAuthRepository;
import com.wedspot.backend.services.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final IAuthRepository authRepository;
    private final UserMapper userMapper;

    @Override
    public APIResponse login(LoginRequest request) {
        // Logic for login (Demo for now)
        System.out.println("Login request: " + request.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", "demo-jwt-token-" + request.getEmail().split("@")[0]);
        response.put("role", "Admin"); // Logic to fetch from DB
        response.put("name", request.getEmail().split("@")[0]);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(response);
        apiResponse.setMessage("Login successful");
        return apiResponse;
    }

    @Override
    public APIResponse register(RegisterRequest request) {
        Optional<User> existingUser = authRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }
        User user = userMapper.toEntity(request);
        authRepository.save(user);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("User registered successfully");
        return apiResponse;
    }

    @Override
    public APIResponse getUser(Long userId) {
        User user = authRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserDTO userDTO = userMapper.toDTO(user);
        
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(userDTO);
        apiResponse.setMessage("User fetched successfully");
        return apiResponse;
    }

    @Override
    public APIResponse getAllUsers() {
        List<User> users = authRepository.findAll();
        List<UserDTO> userDTOs = users.stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
        
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(userDTOs);
        apiResponse.setTotalElements(userDTOs.size());
        apiResponse.setMessage("Users fetched successfully");
        return apiResponse;
    }

    @Override
    public APIResponse forgotPassword(ForgotPasswordRequest request) {
        // Logic to generate OTP and send email (Demo for now)
        System.out.println("Forgot password request for: " + request.getEmail());
        
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("OTP sent to your email successfully!");
        return apiResponse;
    }

    @Override
    public APIResponse resetPassword(ResetPasswordRequest request) {
        // Logic to update password in DB (Demo for now)
        System.out.println("Reset password for: " + request.getEmail());
        
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Password reset successfully!");
        return apiResponse;
    }

    @Override
    public APIResponse verifyOtp(VerifyOtpRequest request) {
        // Logic to verify OTP (Demo for now)
        System.out.println("Verifying OTP for: " + request.getEmail() + " - " + request.getOtp());
        
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("OTP verified successfully!");
        return apiResponse;
    }

    @Override
    public APIResponse verifyToken(String token) {
        // Logic to verify JWT token (Demo for now)
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Token is valid");
        return apiResponse;
    }

    @Override
    public APIResponse logout(String token) {
        // Logic to invalidate token (Demo for now)
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Logout successful");
        return apiResponse;
    }
}
