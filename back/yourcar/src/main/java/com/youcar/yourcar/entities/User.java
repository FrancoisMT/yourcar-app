package com.youcar.yourcar.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "user")
public class User {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 public Integer id;

	 public String name;
	 public String mail;
	 public String password;

	 @Column(name = "created_at")
	 @CreationTimestamp
	 public LocalDateTime createdAt;

	 @Column(name = "updated_at")
	 @UpdateTimestamp
	 public LocalDateTime updatedAt;
}
