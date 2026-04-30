package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.*;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.exception.InvalidCredentialsException;
import com.wedspot.backend.exception.ResourceAlreadyExistsException;
import com.wedspot.backend.exception.ResourceNotFoundException;
import com.wedspot.backend.config.JwtUtils;
import com.wedspot.backend.mappers.IUserMapper;
import com.wedspot.backend.repository.IAuthRepository;
import com.wedspot.backend.services.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final IAuthRepository authRepository;

    private final IUserMapper IUserMapper;

    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    @Override
    public APIResponse<LoginResponse> login(LoginRequest request) {

        User fetchedUser = authRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), fetchedUser.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        UserDTO fetchedUserDTO = IUserMapper.toDTO(fetchedUser);
        String token = jwtUtils.generateToken(fetchedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUser(fetchedUserDTO);
        loginResponse.setAccessToken(token);
        loginResponse.setRefreshToken(token);

        APIResponse<LoginResponse> apiResponse = new APIResponse<>();
        apiResponse.setData(loginResponse);
        apiResponse.setMessage("Login successful");
        return apiResponse;
    }

    @Override
    public APIResponse<LoginResponse> register(RegisterRequest request) {
        Optional<User> existingUser = authRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }
        User user = IUserMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = authRepository.save(user);
        UserDTO savedUserDTO = IUserMapper.toDTO(savedUser);
        String token = jwtUtils.generateToken(savedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUser(savedUserDTO);
        loginResponse.setAccessToken(token);
        loginResponse.setRefreshToken(token);

        APIResponse<LoginResponse> apiResponse = new APIResponse<>();
        apiResponse.setData(loginResponse);
        apiResponse.setMessage("User registered successfully");
        return apiResponse;
    }

}
