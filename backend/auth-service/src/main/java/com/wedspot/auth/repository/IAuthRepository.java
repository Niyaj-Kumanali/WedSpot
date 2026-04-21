package com.wedspot.auth.repository;

import com.wedspot.auth.Model.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAuthRepository extends JpaRepository<User, Integer> {

}
