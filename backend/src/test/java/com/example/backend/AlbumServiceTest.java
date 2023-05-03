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

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

@AutoConfigureMockMvc
@SpringBootTest
class AlbumServiceTest {
    private AlbumService albumService;
    @Mock
    private AlbumRepoInterface albumRepoInterfaceMock;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        albumService = new AlbumService(albumRepoInterfaceMock);
    }
    @Test
    void testGetAll() {
        Album album1 = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001");
        Album album2 = new Album("2", "Tom Jones", "Not unusual", "CD", "01.01.2001");
        Album album3 = new Album("3", "Barry White", "can't get enough of your love", "CD", "01.01.2001");

        List<Album> expectedAlbums = Arrays.asList(album1, album2, album3);

        when(albumRepoInterfaceMock.findAll()).thenReturn(expectedAlbums);

        List<Album> actualAlbums = albumService.getAll();

        Assertions.assertEquals(expectedAlbums.size(), actualAlbums.size());

        for (int i = 0; i < expectedAlbums.size(); i++) {
            Assertions.assertEquals(expectedAlbums.get(i), actualAlbums.get(i));
        }
        verify(albumRepoInterfaceMock, times(1)).findAll();
    }
}
