package com.youcar.yourcar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcar.yourcar.entities.ChatMessage;


public interface ChatRepository extends JpaRepository<ChatMessage, Integer> {
	 List<ChatMessage> findByUserId(Integer userId);  
	 List<ChatMessage> findByAgentId(Integer agentId);
}
