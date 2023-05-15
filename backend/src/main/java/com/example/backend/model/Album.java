package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document
public record Album (
        @Id
        String barcode,
        @NotBlank @Size(min = 5, max = 75)
        String artist,
        @NotBlank @Size(min = 5, max = 75)
        String title,
        String format,
        String releaseDate,
        String imageUrl
){
}
