package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.*;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.exception.InvalidCredentialsException;
import com.wedspot.backend.exception.ResourceAlreadyExistsException;
import com.wedspot.backend.exception.ResourceNotFoundException;
import com.wedspot.backend.mappers.UserMapper;
import com.wedspot.backend.repository.IAuthRepository;
import com.wedspot.backend.repository.IUserRepository;
import com.wedspot.backend.services.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final IAuthRepository authRepository;

    private final IUserRepository userRepository;

    private final UserMapper userMapper;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public APIResponse login(LoginRequest request) {

        User fetchedUser = authRepository.findByEmail(request.getEmail()).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), fetchedUser.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        UserDTO fetchedUserDTO = userMapper.toDTO(fetchedUser);
        String token = UUID.randomUUID().toString();


        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUser(fetchedUserDTO);
        loginResponse.setAccessToken(token);
        loginResponse.setRefreshToken(token);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(loginResponse);
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
        User savedUser = authRepository.save(user);
        UserDTO savedUserDTO = userMapper.toDTO(savedUser);
        String token = UUID.randomUUID().toString();

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUser(savedUserDTO);
        loginResponse.setAccessToken(token);
        loginResponse.setRefreshToken(token);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(loginResponse);
        apiResponse.setMessage("User registered successfully");
        return apiResponse;
    }


}
