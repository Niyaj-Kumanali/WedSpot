package com.wedspot.backend.services;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.LoginRequest;
import com.wedspot.backend.Model.LoginResponse;
import com.wedspot.backend.Model.RegisterRequest;

public interface IAuthService {
    APIResponse<LoginResponse> login(LoginRequest request);

    APIResponse<LoginResponse> register(RegisterRequest request);
}
