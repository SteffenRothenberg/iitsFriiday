package com.example.backend.service;

import com.example.backend.model.Album;
import com.example.backend.repository.AlbumRepoInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AlbumService {
    private final AlbumRepoInterface albumRepoInterface;
    public List<Album> getAll() {
        return albumRepoInterface.findAll();
    }
}
