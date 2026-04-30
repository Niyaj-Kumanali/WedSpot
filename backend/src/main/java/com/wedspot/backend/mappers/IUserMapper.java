package com.wedspot.backend.mappers;


import com.wedspot.backend.Model.Entity.User;
import com.wedspot.backend.Model.RegisterRequest;
import com.wedspot.backend.Model.UpdateUserRequest;
import com.wedspot.backend.Model.UserDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface IUserMapper {

    User toEntity(RegisterRequest request);

    UserDTO toDTO(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(UpdateUserRequest request, @MappingTarget User user);
}
