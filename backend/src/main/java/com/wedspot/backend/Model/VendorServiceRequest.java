package com.wedspot.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorServiceRequest {

    private String name;

    private String description;

    private String[] tags;

    private String imageUrl;

    private double price;

    private String location;

    private String category;

    private double quantity = 1;
}
