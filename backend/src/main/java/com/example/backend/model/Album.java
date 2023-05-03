package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Album (
        @Id
        String barcode,
        String artist,
        String title,
        String format,
        String releaseDate

){
}
