package com.youcar.yourcar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcar.yourcar.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByMail(String mail);
}