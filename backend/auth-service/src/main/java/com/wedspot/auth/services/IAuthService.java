package com.wedspot.auth.services;

import com.wedspot.auth.Model.APIResponse;
import com.wedspot.auth.Model.LoginRequest;
import com.wedspot.auth.Model.RegisterRequest;

public interface IAuthService {
    APIResponse login(LoginRequest request);

    APIResponse register(RegisterRequest request);

    APIResponse getAllUsers();

}
