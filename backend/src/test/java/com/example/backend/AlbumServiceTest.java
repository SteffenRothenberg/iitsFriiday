package com.example.backend;

import com.example.backend.model.Album;
import com.example.backend.repository.AlbumRepoInterface;
import com.example.backend.service.AlbumService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc
@SpringBootTest
class AlbumServiceTest {
    private AlbumService albumService;
    @Mock
    private AlbumRepoInterface albumRepoInterface;

    @BeforeEach
    void setUp() {
        albumService = new AlbumService(albumRepoInterface);
    }
    @Test
    void testGetAll() {
        //GIVEN
        Album album1 = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001","");
        Album album2 = new Album("2", "Tom Jones", "Not unusual", "CD", "01.01.2001","");
        Album album3 = new Album("3", "Barry White", "can't get enough of your love", "CD", "01.01.2001","");

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

        Album album1 = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001","");
        when(albumRepoInterface.save(album1))
                .thenReturn(album1);

        //WHEN
        Album actual = albumService.addAlbum(album1);

        //THEN
        verify(albumRepoInterface).save(album1);
        assertEquals(actual, album1);
    }
    @DirtiesContext
    @Test
    void getAlbumByID_ShouldReturnOneAlbum_WhenOneAlbumWasAdded() {
        //GIVEN
        Album album1 = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001","");

        when(albumRepoInterface.findById("1")).thenReturn(Optional.of(album1));

        //WHEN
        Album actual = albumService.getAlbumById("1");

        //THEN
        Album expected = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001","");
        verify(albumRepoInterface).findById("1");
        assertEquals(expected, actual);
    }
    @DirtiesContext
    @Test
    void getAlbumByID_ShouldReturnException_WhenAlbumDoesNotExist() {
        //GIVEN
        when(albumRepoInterface.findById("1")).thenThrow(NoSuchElementException.class);

        //WHEN
        try {
            albumService.getAlbumById("1");
            fail();
        }
        //THEN
        catch (NoSuchElementException Ignored){
            verify(albumRepoInterface).findById("1");
        }
    }
    @DirtiesContext
    @Test
    void editAlbum_ShouldReturnEditedAlbum_WhenValidProvided(){
        //GIVEN
        Album updatedAlbum = new Album("1", "Nina Simone", "Diamonds", "CD", "01.01.2001","");

        when(albumRepoInterface.save(updatedAlbum)).thenReturn(updatedAlbum);

        //WHEN
        Album actual = albumService.editAlbum(updatedAlbum);

        //THEN
        verify(albumRepoInterface).save(updatedAlbum);
        assertEquals(updatedAlbum, actual);
    }
    @DirtiesContext
    @Test
    void deleteAlbumById_shouldDeleteAlbumById(){
        //GIVEN
        Album albumToDelete = new Album ("1", "Nina Simone", "Diamonds", "CD", "01.01.2001","");
        albumRepoInterface.save(albumToDelete);

        //WHEN
        albumService.deleteAlbum("1");

        //THEN
        verify(albumRepoInterface).deleteById("1");
    }
}
