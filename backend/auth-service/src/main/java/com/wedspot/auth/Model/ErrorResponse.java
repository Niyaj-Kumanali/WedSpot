package com.wedspot.auth.Model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int statusCode;
    private boolean success = false;
    private String message;
    private String path;
    private Map<String, String> errors;
}
