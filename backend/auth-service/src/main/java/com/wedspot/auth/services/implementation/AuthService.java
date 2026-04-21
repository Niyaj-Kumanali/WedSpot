package com.wedspot.auth.services.implementation;

import com.wedspot.auth.Model.APIResponse;
import com.wedspot.auth.Model.Entity.User;
import com.wedspot.auth.Model.LoginRequest;
import com.wedspot.auth.Model.RegisterRequest;
import com.wedspot.auth.Model.UserDTO;
import com.wedspot.auth.repository.IAuthRepository;
import com.wedspot.auth.services.IAuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final IAuthRepository authRepository;

    private final ModelMapper modelMapper;

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
        // Demo logic
        Map<String, Object> response = new HashMap<>();
        response.put("userEmail", request.getEmail());

        User user = modelMapper.map(request, User.class);
        authRepository.save(user);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(response);
        apiResponse.setMessage("User registered successfully");
        return apiResponse;
    }

    @Override
    public APIResponse getAllUsers() {
        List<User> users = authRepository.findAll();
        List<UserDTO> userDTOs = users.stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList());
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(userDTOs);
        apiResponse.setTotalElements(userDTOs.size());
        apiResponse.setPageNumber(0);
        apiResponse.setTotalPages(userDTOs.size());
        apiResponse.setMessage("Users fetched successfully");
        return apiResponse;
    }
}
