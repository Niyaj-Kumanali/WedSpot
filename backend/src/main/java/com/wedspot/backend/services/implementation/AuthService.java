package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.LoginRequest;
import com.wedspot.backend.Model.RegisterRequest;
import com.wedspot.backend.Model.UserDTO;
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
        // Demo logic
        System.out.println("Login request: " + request.getEmail() + " / " + request.getPassword());
        Map<String, Object> response = new HashMap<>();
        response.put("token", "demo-jwt-token-12345");

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
        List<UserDTO> userDTOs = users.stream().map(userMapper::toDTO).collect(Collectors.toList());
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(userDTOs);
        apiResponse.setTotalElements(userDTOs.size());
        apiResponse.setPageNumber(0);
        apiResponse.setTotalPages(userDTOs.size());
        apiResponse.setMessage("Users fetched successfully");
        return apiResponse;
    }
}
