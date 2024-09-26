package com.youcar.yourcar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcar.yourcar.entities.Agent;

public interface AgentRepository extends JpaRepository<Agent, Integer> {
    Agent findByMail(String mail);
}