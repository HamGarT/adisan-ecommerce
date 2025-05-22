package com.hamgar.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class ImageService {
    @Autowired
    private S3Client s3Client;
    private final String BUCKET = "test";

    public void uploadImage(MultipartFile file, String fileName) throws IOException {

        if (!s3Client.listBuckets().buckets().stream()
                .anyMatch(b -> b.name().equals(BUCKET))) {
            s3Client.createBucket(b -> b.bucket(BUCKET));
        }

        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(BUCKET)
                        .key(fileName)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );
    }

    public byte[] getImage(String fileName) {
        return s3Client.getObjectAsBytes(b -> b.bucket(BUCKET).key(fileName)).asByteArray();
    }

    public String generateImageName(String originalFileName) {
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = UUID.randomUUID().toString().substring(0, 8);
        return  timestamp + "_" + random + extension;
    }
}
