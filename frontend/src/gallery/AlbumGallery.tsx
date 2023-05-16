import { Album } from "../model/Album";
import { useState } from "react";
import useAlbums from "../customHooks/UseAlbums";
import AlbumCard from "../card/AlbumCard";
import { TextField, Grid, MenuItem } from "@mui/material";

type AlbumGalleryProps = {
    albums: Album[];
};

enum SearchOption {
    Title = "title",
    Artist = "artist",
}

export default function AlbumGallery(props: AlbumGalleryProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState(SearchOption.Title);
    const { albums } = useAlbums();

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOption(event.target.value as SearchOption);
    };

    const filteredAlbums = albums.filter((album) =>
        album[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="album-gallery">
            <div className="actionbar">
                <TextField
                    type="text"
                    placeholder="Search for..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <TextField
                    select
                    value={searchOption}
                    onChange={handleSearchOptionChange}
                >
                    <MenuItem value={SearchOption.Title}>Title</MenuItem>
                    <MenuItem value={SearchOption.Artist}>Artist</MenuItem>
                </TextField>
            </div>
            <Grid container spacing={2}>
                {filteredAlbums.map((card: Album) => (
                    <Grid item key={card.barcode} xs={4}>
                        <AlbumCard album={card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
