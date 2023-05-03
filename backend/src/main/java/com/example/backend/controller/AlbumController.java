package com.example.backend.controller;

import com.example.backend.service.AlbumService;
import com.example.backend.model.Album;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping
    public List<Album> getAll(){
        return albumService.getAll();
    }
}