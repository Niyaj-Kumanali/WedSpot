package com.wedspot.backend.controller;

import com.wedspot.backend.Model.APIResponse;
import com.wedspot.backend.Model.UpdatePasswordRequest;
import com.wedspot.backend.Model.UpdateUserRequest;
import com.wedspot.backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping("/user/{id}")
    public ResponseEntity<APIResponse> getAllUser(@PathVariable Long id) {
        APIResponse response = userService.getUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/users")
    public ResponseEntity<APIResponse> getAllUsers() {
        APIResponse response = userService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getUser(@PathVariable Long id) {
        APIResponse response = userService.getUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<APIResponse> UpdateProfile(@PathVariable long id, @RequestBody UpdateUserRequest request)
    {
        APIResponse response = userService.UpdateUser(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PutMapping("/password/{id}")
    public ResponseEntity<APIResponse>  UpdatePassword(@PathVariable long id, @RequestBody UpdatePasswordRequest request)
    {
        APIResponse response = userService.UpdatePassword(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
