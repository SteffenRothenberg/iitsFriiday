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

    public Album addAlbum(Album myAlbum) {
        return albumRepoInterface.save(myAlbum);
    }

    public Album getAlbumById(String id) {
        return albumRepoInterface.findById(id).orElseThrow();
    }

    public Album editAlbum(Album albumToEdit) {
        return albumRepoInterface.save(albumToEdit);
    }

    public void deleteAlbum(String id) {
        albumRepoInterface.deleteById(id);
    }
}
