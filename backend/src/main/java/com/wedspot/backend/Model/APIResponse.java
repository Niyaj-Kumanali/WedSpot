package com.wedspot.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class APIResponse<T> {
    public T data;

    public LocalDateTime timestamp = LocalDateTime.now();

    public String message;

    public int statusCode = HttpStatus.OK.value();

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int totalElements;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int totalPages;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int pageNumber;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    public int pageSize;

    public boolean ok = true;

}
