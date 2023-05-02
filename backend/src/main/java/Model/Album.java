package Model;

import org.springframework.data.annotation.Id;

public record Album (
        @Id
        String barcode,
        String artist,
        String title,
        String format,
        String releaseDate

){
}
