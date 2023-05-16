import { Album } from "../model/Album";
import { useState } from "react";
import useAlbums from "../customHooks/UseAlbums";
import AlbumCard from "../card/AlbumCard";
import { TextField, Grid } from "@mui/material";

type AlbumGalleryProps = {
    albums: Album[];
};

export default function AlbumGallery(props: AlbumGalleryProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const { albums } = useAlbums();
    const filteredAlbums = albums.filter((album) =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="album-gallery">
            <div className="actionbar">
                <TextField
                    type="text"
                    placeholder="AlbumTitel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Grid container spacing={2}>
                {filteredAlbums.map((card: Album) => (
                    <Grid item key={card.barcode} xs={12} sm={6} md={4} lg={3}>
                        <AlbumCard album={card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
