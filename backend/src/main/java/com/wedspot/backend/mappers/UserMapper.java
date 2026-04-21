package com.wedspot.backend.mappers;


import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.RegisterRequest;
import com.wedspot.backend.Model.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterRequest request);

    UserDTO toDTO(User user);
}
