package com.example.cctv_backend.controller;

import com.example.cctv_backend.entity.Enquiry;
import com.example.cctv_backend.repository.EnquiryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(origins = "*")
public class EnquiryController {

    private final EnquiryRepository repository;

    public EnquiryController(EnquiryRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Enquiry createEnquiry(@RequestBody Enquiry enquiry) {
        return repository.save(enquiry);
    }

    @GetMapping
    public List<Enquiry> getAllEnquiries() {
        return repository.findAll();
    }

    @PutMapping("/{id}/status")
    public Enquiry updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Enquiry enquiry = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));

        enquiry.setStatus(status);

        return repository.save(enquiry);
    }

    @DeleteMapping("/{id}")
    public String deleteEnquiry(@PathVariable Long id) {

        repository.deleteById(id);

        return "Enquiry deleted successfully";
    }
}