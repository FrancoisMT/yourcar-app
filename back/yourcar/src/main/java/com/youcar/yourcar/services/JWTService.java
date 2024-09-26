package com.youcar.yourcar.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;

@Service
public class JWTService {

	 @Value("${security.app.jwtSecret}")
	 private String secretKey;
	
	 @Value("${security.app.jwtExpirationMs}")
	 private long jwtExpiration;
	 
	 public String generateToken(String email, String role) {
	        Map<String, Object> claims = new HashMap<>();
	        claims.put("role", role);
	        return createToken(claims, email);
	    }

	    private String createToken(Map<String, Object> claims, String subject) {
	        return Jwts.builder()
	                .setClaims(claims)
	                .setSubject(subject)
	                .setIssuedAt(new Date(System.currentTimeMillis()))
	                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
	                .signWith(SignatureAlgorithm.HS256, secretKey)
	                .compact();
	    }

	    public boolean validateToken(String token, String email) {
	        final String extractedEmail = extractUsername(token);
	        return (extractedEmail.equals(email) && !isTokenExpired(token));
	    }

	    public String extractUsername(String token) {
	        return extractAllClaims(token).getSubject();
	    }

	    private boolean isTokenExpired(String token) {
	        return extractAllClaims(token).getExpiration().before(new Date());
	    }
	    
	    private Claims extractAllClaims(String token) {
			
			return Jwts
					.parser()
					.verifyWith(getSigninKey())
					.build()
					.parseSignedClaims(token)
					.getPayload();
			
	    }
	 
	    private SecretKey getSigninKey() {
	    	byte[] keyBytes = Decoders.BASE64URL.decode(secretKey);
	        return Keys.hmacShaKeyFor(keyBytes);
	    }
	
}
