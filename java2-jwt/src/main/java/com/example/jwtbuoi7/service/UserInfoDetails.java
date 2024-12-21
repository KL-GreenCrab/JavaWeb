package com.example.jwtbuoi7.service;

import com.example.jwtbuoi7.entity.UserInfo;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserInfoDetails implements UserDetails {

    @Getter
    private String email; // Changed from 'name' to 'email' for clarity
    private  String name;
    private String password;

    private  String roles;
    private List<GrantedAuthority> authorities;

    public String getEmail() {
        return email;
    }

    public String getRoles() {
        return roles;
    }

    public UserInfoDetails(UserInfo userInfo) {
        this.email = userInfo.getEmail();
        this.name = userInfo.getName();
        this.roles = userInfo.getRoles();// Assuming 'name' is used as 'email'
        this.password = userInfo.getPassword();
        this.authorities = List.of(userInfo.getRoles().split(","))
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement your logic if you need this
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement your logic if you need this
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement your logic if you need this
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement your logic if you need this
    }
}