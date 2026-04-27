package com.wedspot.backend.controller;

import com.wedspot.backend.Model.APIResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client")
public class ClientController {

    @GetMapping
    public ResponseEntity<APIResponse> GetAllClients() {
        APIResponse apiResponse = new APIResponse();
        return ResponseEntity.ok().body(apiResponse);
    }

}
