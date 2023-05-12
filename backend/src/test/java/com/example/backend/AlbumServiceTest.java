package com.example.backend;

import com.example.backend.model.Album;
import com.example.backend.repository.AlbumRepoInterface;
import com.example.backend.service.AlbumService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc
@SpringBootTest
class AlbumServiceTest {
    private AlbumService albumService;
    @Mock
    private AlbumRepoInterface albumRepoInterface;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        albumService = new AlbumService(albumRepoInterface);
    }
    @Test
    void testGetAll() {
        //GIVEN
        Album album1 = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001");
        Album album2 = new Album("2", "Tom Jones", "Not unusual", "CD", "01.01.2001");
        Album album3 = new Album("3", "Barry White", "can't get enough of your love", "CD", "01.01.2001");

        List<Album> expectedAlbums = Arrays.asList(album1, album2, album3);

        when(albumRepoInterface.findAll()).thenReturn(expectedAlbums);
        //WHEN
        List<Album> actualAlbums = albumService.getAll();

        Assertions.assertEquals(expectedAlbums.size(), actualAlbums.size());

        for (int i = 0; i < expectedAlbums.size(); i++) {
            Assertions.assertEquals(expectedAlbums.get(i), actualAlbums.get(i));
        }
        //THEN
        verify(albumRepoInterface, times(1)).findAll();
    }
    @Test
    void getAll_expectedEmptyList_WhenDataBaseIsEmpty() {
        //GIVEN
        final AlbumRepoInterface albumRepoInterface = mock(AlbumRepoInterface.class);
        final AlbumService albumService = new AlbumService(albumRepoInterface);

        when(albumRepoInterface.findAll())
                .thenReturn(Collections.emptyList());

        //WHEN
        List<Album> actual = albumService.getAll();
        List<Album> expected = new ArrayList<>();

        //THEN
        verify(albumRepoInterface).findAll();
        assertEquals(actual, expected);
    }
    @DirtiesContext
    @Test
    void addAlbum_ShouldRespondAddedAlbum_WhenAlbumAdded() {
        //GIVEN
        final AlbumRepoInterface albumRepoInterface = mock(AlbumRepoInterface.class);
        final AlbumService albumService = new AlbumService(albumRepoInterface);

        Album album1 = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001");
        when(albumRepoInterface.save(album1))
                .thenReturn(album1);

        //WHEN
        Album actual = albumService.addAlbum(album1);

        //THEN
        verify(albumRepoInterface).save(album1);
        assertEquals(actual, album1);
    }
}
