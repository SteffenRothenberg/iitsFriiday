import useDetail from "../customHooks/UseDetail";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Grid,
    Container
} from "@mui/material";
import './AlbumDetailCard.css'

type AlbumDetailProps = {
    deleteAlbum: (barcode: string) => void;
};

export default function AlbumDetailCard(props: AlbumDetailProps) {
    const {editedAlbum, album, editing, handleFormSubmit, editOnClick, albumInputChange} = useDetail();
    const navigate = useNavigate();

    function onDeleteClick() {
        if (album) {
            props.deleteAlbum(album.barcode);
        }
        navigate("/albums");
    }

    return (
        <Card className="album-detail">
            {album ? (
                editing ? (
                    <form onSubmit={handleFormSubmit}>
                        <CardHeader title="Release bearbeiten"/>
                        <CardContent>
                            <TextField
                                label="Artist"
                                name="artist"
                                value={editedAlbum.artist}
                                onChange={albumInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Title"
                                name="title"
                                value={editedAlbum.title}
                                onChange={albumInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Format"
                                name="format"
                                value={editedAlbum.format}
                                onChange={albumInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Release Date"
                                name="releaseDate"
                                value={editedAlbum.releaseDate}
                                onChange={albumInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Image URL"
                                name="imageUrl"
                                value={editedAlbum.imageUrl}
                                onChange={albumInputChange}
                                fullWidth
                            />
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained" color="warning">
                                Speichern
                            </Button>
                        </CardActions>
                    </form>
                ) : (
                    <div>
                        <Container maxWidth="sm">
                            <CardHeader title="Alle Infos zu diesem Release:"/>
                            <CardContent>
                                <Typography variant="body1">Artist: {album.artist}</Typography>
                                <Typography variant="body1">Title: {album.title}</Typography>
                                <Typography variant="body1">Format: {album.format}</Typography>
                                <Typography variant="body1">Release-Date: {album.releaseDate}</Typography>
                                <img src={album.imageUrl} alt="Album-Cover" width="150" height="150"/>
                            </CardContent>
                            <Grid container spacing={2} justifyContent="space-evenly" mt={2}>
                                <CardActions>
                                    <Button onClick={editOnClick} variant="contained" color="warning">
                                        Release bearbeiten
                                    </Button>
                                    <Button onClick={onDeleteClick} variant="contained" color="error">
                                        Release löschen
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Container>
                    </div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </Card>
    );
}
