package com.wedspot.backend.services.implementation;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.UpdatePasswordRequest;
import com.wedspot.backend.Model.UpdateUserRequest;
import com.wedspot.backend.Model.UserDTO;
import com.wedspot.backend.exception.InvalidCredentialsException;
import com.wedspot.backend.exception.ResourceNotFoundException;
import com.wedspot.backend.mappers.UserMapper;
import com.wedspot.backend.repository.IUserRepository;
import com.wedspot.backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository;

    private final UserMapper userMapper;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public APIResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserDTO userDTO = userMapper.toDTO(user);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(userDTO);
        apiResponse.setMessage("User fetched successfully");
        return apiResponse;
    }

    @Override
    public APIResponse getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = users.stream().map(userMapper::toDTO).collect(Collectors.toList());
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(userDTOs);
        apiResponse.setTotalElements(userDTOs.size());
        apiResponse.setPageNumber(0);
        apiResponse.setTotalPages(userDTOs.size());
        apiResponse.setMessage("Users fetched successfully");
        return apiResponse;
    }

    @Override
    public APIResponse UpdateUser(long id, UpdateUserRequest request) {
        User fetchedUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userMapper.updateEntityFromRequest(request, fetchedUser);

        User savedUser = userRepository.save(fetchedUser);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(savedUser);
        apiResponse.setMessage("User updated successfully");
        return apiResponse;
    }

    @Override
    public APIResponse UpdatePassword(long id, UpdatePasswordRequest request) {
        User fetchedUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(!fetchedUser.getPassword().equals(passwordEncoder.encode(request.getOldPassword()))) {
            throw new InvalidCredentialsException("Old password does not match");
        }

        fetchedUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(fetchedUser);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Password updated successfully");
        return apiResponse;
    }

    @Override
    public APIResponse deleteUser(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("User deleted successfully");
        return apiResponse;
    }
}
