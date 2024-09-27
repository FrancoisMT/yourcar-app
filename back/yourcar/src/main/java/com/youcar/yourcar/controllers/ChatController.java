package com.youcar.yourcar.controllers;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youcar.yourcar.entities.ChatMessage;
import com.youcar.yourcar.entities.User;
import com.youcar.yourcar.repositories.AgentRepository;
import com.youcar.yourcar.repositories.ChatRepository;
import com.youcar.yourcar.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/chat")
public class ChatController {

	 private final SimpMessagingTemplate messagingTemplate;
	 private final ChatRepository chatRepository; 
	 private final UserRepository userRepository;
	 private final AgentRepository agentRepository;

	 public ChatController(SimpMessagingTemplate messagingTemplate, ChatRepository chatRepository, UserRepository userRepository, AgentRepository agentRepository) {
	      this.messagingTemplate = messagingTemplate;
	      this.chatRepository = chatRepository;
	      this.userRepository = userRepository;
	      this.agentRepository = agentRepository;
	 }

	 @MessageMapping("/sendMessage")
	 @SendTo("/topic/messages")
	 public ChatMessage sendMessage(ChatMessage message) {
	      chatRepository.save(message); 
	      return message; 
	 }
	 
	 @GetMapping("/messages/{userId}")
	 public List<ChatMessage> getMessagesByUserId(@PathVariable Integer userId) {
	      return chatRepository.findByUserId(userId);
	 }

	 @GetMapping("/users")
	 public List<User> getAllUsers() {
	      return userRepository.findAll();
	 }
	
}
