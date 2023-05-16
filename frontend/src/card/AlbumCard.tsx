import { Album } from "../model/Album";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, CardMedia, Grid } from "@mui/material";
import './AlbumCard.css';

type AlbumProps = {
    album: Album;
};

export default function AlbumCard(props: AlbumProps) {
    const navigate = useNavigate();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className="album-card">
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        src={props.album.imageUrl}
                        alt="Album-Card"
                        sx={{
                            maxHeight: "150px",
                            maxWidth: "150px",
                            width: "auto",
                            height: "auto",
                            objectFit: "cover",
                            marginRight: "1rem",
                        }}
                    />
                    <div>
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
                    </div>
                </CardContent>

            </Card>
        </Grid>
    );
}
