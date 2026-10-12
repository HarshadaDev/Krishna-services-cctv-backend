package com.example.cctv_backend.controller;

import com.example.cctv_backend.entity.Admin;
import com.example.cctv_backend.repository.AdminRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminRepository repository;

    public AdminController(AdminRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/login")
    public String login(@RequestBody Admin loginAdmin) {

        Admin admin = repository.findByUsername(loginAdmin.getUsername())
                .orElse(null);

        if (admin != null &&
                admin.getPassword().equals(loginAdmin.getPassword())) {

            return "Login successful";
        }

        return "Invalid username or password";
    }
}