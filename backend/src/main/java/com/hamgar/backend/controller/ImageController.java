package com.hamgar.backend.controller;

import com.hamgar.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> upload(@RequestParam MultipartFile file) throws IOException {
        String newImageFileName = imageService.generateImageName(file.getOriginalFilename());
        imageService.uploadImage(file, newImageFileName);
        System.out.println(file.getOriginalFilename());
        return ResponseEntity.ok(Map.of("name", newImageFileName));
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> download(@PathVariable String fileName) {
        byte[] image = imageService.getImage(fileName);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }
}
