package com.example.backend;

import com.example.backend.model.Album;
import com.example.backend.repository.AlbumRepoInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AlbumIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    AlbumRepoInterface albumRepoInterface;

    @Autowired
    ObjectMapper objectMapper;


    @Test
    @DirtiesContext
    void getAll_ShouldReturnAllAlbums() throws Exception {
        mockMvc.perform(get("/api/albums"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }
    @Test
    @DirtiesContext
    void getAlbum_ShouldReturnAllRecipeAdded() throws Exception {
        Album album = new Album("666", "Nina Simone", "Diamonds", "CD", "01.01.2001");
        albumRepoInterface.save(album);
        Album album2 = new Album("333", "Tom Jones", "Not unusual", "CD", "01.01.2001");
        albumRepoInterface.save(album2);
        Album album3 = new Album("111", "BonezMc, GZUZ", "High & Hungrig 3", "CD", "28.04.2023");
        albumRepoInterface.save(album3);

        mockMvc.perform(get("/api/albums"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                [
                                {
                                "barcode": "666",
                                "artist": "Nina Simone",
                                "title": "Diamonds",
                                "format": "CD",
                                "releaseDate": "01.01.2001"
                                },
                                {
                                "barcode": "333",
                                "artist": "Tom Jones",
                                "title": "Not unusual",
                                "format": "CD",
                                "releaseDate": "01.01.2001"
                                },
                                {
                                "barcode": "111",
                                "artist": "BonezMc, GZUZ",
                                "title": "High & Hungrig 3",
                                "format": "CD",
                                "releaseDate": "28.04.2023"
                                }
                                ]
                                """
                ));
    }
}
