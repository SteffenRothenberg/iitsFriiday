package com.example.backend.controller;

import com.example.backend.service.AlbumService;
import com.example.backend.model.Album;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @PostMapping
    public Album addAlbum(@RequestBody Album myAlbum) {
        return albumService.addAlbum(myAlbum);
    }

    @GetMapping("{id}")
    public Album getAlbumById(@PathVariable String id){
        return albumService.getAlbumById(id);
    }
    @PutMapping(path = {"{id}/update", "{id}"})
    public Album editAlbum(@PathVariable String barcode,@RequestBody Album albumToEdit) {
        if (!albumToEdit.barcode().equals(barcode)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The Recipe does not exist");
        }
        return albumService.editAlbum(albumToEdit);
    }
    @DeleteMapping("{id}")
    public void deleteAlbum(@PathVariable String id){
        albumService.deleteAlbum(id);
    }

}