import {NewAlbum} from "../model/Album";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './AddAlbum.css'
import {Button, TextField} from "@mui/material";

type AddAlbumProps = {
    addAlbum: (newAlbum: NewAlbum) => void
}

export default function AddAlbum(props: AddAlbumProps){
    const [artist, setArtist] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [format, setFormat] = useState<string>("")
    const [releaseDate, setReleaseDate] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const navigate = useNavigate()

    function onSaveAlbum(event: FormEvent<HTMLFormElement>){

        event.preventDefault()

        const newAlbum: NewAlbum = {artist: artist,title: title, format: format, releaseDate: releaseDate, imageUrl: imageUrl}

        props.addAlbum(newAlbum)

        navigate("/albums")
    }
    return (
        <div>
            <form onSubmit={onSaveAlbum}>
                <TextField
                    label="Artist"
                    value={artist}
                    onChange={(event) => {
                        setArtist(event.target.value);
                    }}
                    fullWidth
                />
                <TextField
                    label="Title"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    fullWidth
                    multiline
                    rows={4}
                />
                <TextField
                    label="Format"
                    value={format}
                    onChange={(event) => {
                        setFormat(event.target.value);
                    }}
                    fullWidth
                    multiline
                    rows={4}
                />
                <TextField
                    label="Release Date"
                    value={releaseDate}
                    onChange={(event) => {
                        setReleaseDate(event.target.value);
                    }}
                    fullWidth
                    multiline
                    rows={4}
                />
                <TextField
                    label="Image URL"
                    value={imageUrl}
                    onChange={(event) => {
                        setImageUrl(event.target.value);
                    }}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="warning">
                    Speichern
                </Button>
            </form>
        </div>
    );
}