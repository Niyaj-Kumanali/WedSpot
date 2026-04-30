package com.wedspot.backend.services;

import java.util.List;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.UpdatePasswordRequest;
import com.wedspot.backend.Model.UpdateUserRequest;
import com.wedspot.backend.Model.UserDTO;

public interface IUserService {
    APIResponse<UserDTO> getUser(Long id);

    APIResponse<List<UserDTO>> getAllUsers();

    APIResponse<UserDTO> UpdateUser(long id, UpdateUserRequest request);

    APIResponse<Void> UpdatePassword(long id, UpdatePasswordRequest request);

    APIResponse<Void> deleteUser(long id);
}
