package com.youcar.yourcar.responses;

public class AuthResponse {
	
    private String token;
    private String role;
    private Integer id;
    private String name;

    public AuthResponse(String token, String role, Integer id, String name) {
        this.token = token;
        this.role = role;
        this.id= id;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }
    
    public Integer getId() {
    	return id;
    }
    
    public String getName() {
    	return name;
    }
}