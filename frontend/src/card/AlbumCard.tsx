import { Album } from "../model/Album";
import { useNavigate } from "react-router-dom";
import {Card, CardContent, Typography, Button, CardMedia} from "@mui/material";
import './AlbumCard.css';

type AlbumProps = {
    album: Album;
};

export default function AlbumCard(props: AlbumProps) {
    const navigate = useNavigate();

    return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <Card className="album-card">
                <CardContent sx={{ display: "flex", alignItems: "center", maxWidth: "sm", maxHeight:"sm" }}>
                    <CardMedia
                        component="img"
                        src={props.album.imageUrl}
                        alt="Album-Card"
                        sx={{
                            minHeight:"10rem",
                            minWidth:"10rem",
                            maxHeight:"15%",
                            maxWidth:"15%",
                            marginRight: "1rem",
                        }}/>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="body1" component="p">
                            Artist:
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.album.artist}
                        </Typography>
                        <Typography variant="body1" component="p">
                            Title:
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.album.title}
                        </Typography>
                        <Button
                            onClick={() => navigate("/albums/" + props.album.barcode)}
                            variant="contained"
                            color="warning"
                            className="album-card__button"
                        >
                            Album-Details
                        </Button>
                    </CardContent>
                </CardContent>
            </Card>
        </div>
    );
}