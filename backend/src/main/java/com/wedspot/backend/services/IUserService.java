package com.wedspot.backend.services;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.UpdatePasswordRequest;
import com.wedspot.backend.Model.UpdateUserRequest;

public interface IUserService {
    APIResponse getUser(Long id);
    APIResponse getAllUsers();
    APIResponse UpdateUser(long id, UpdateUserRequest request);
    APIResponse UpdatePassword(long id, UpdatePasswordRequest request);
}
