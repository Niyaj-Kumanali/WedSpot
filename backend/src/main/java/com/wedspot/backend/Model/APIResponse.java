package com.wedspot.backend.Model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class APIResponse {
    public Object data;
    public LocalDateTime timestamp = LocalDateTime.now();
    public String message;
    public int statusCode = HttpStatus.OK.value();
    public boolean success = true;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int totalElements;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int totalPages;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int pageNumber;
}
