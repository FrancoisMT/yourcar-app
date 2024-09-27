package com.youcar.yourcar.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  public Integer id;

	  public String content;
	  public LocalDateTime date;

	  @ManyToOne
	  @JoinColumn(name = "user_id", nullable = false)
	  public User user;

	  @ManyToOne
	  @JoinColumn(name = "agent_id", nullable = true) 
	  public Agent agent;
	
}
