package com.wedspot.backend.services;


import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.LoginRequest;
import com.wedspot.backend.Model.RegisterRequest;

public interface IAuthService {
    APIResponse login(LoginRequest request);
    APIResponse register(RegisterRequest request);
}
