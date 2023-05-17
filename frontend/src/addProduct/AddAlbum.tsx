import { NewAlbum } from "../model/Album";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddAlbum.css'
import { Button, TextField } from "@mui/material";

type AddAlbumProps = {
    addAlbum: (newAlbum: NewAlbum) => void
}

export default function AddAlbum(props: AddAlbumProps) {
    const [artist, setArtist] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [format, setFormat] = useState<string>("")
    const [releaseDate, setReleaseDate] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const navigate = useNavigate()

    function onSaveAlbum(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newAlbum: NewAlbum = { artist: artist, title: title, format: format, releaseDate: releaseDate, imageUrl: imageUrl }
        props.addAlbum(newAlbum)
        navigate("/albums")
    }

    function onImportCSV(event: FormEvent<HTMLInputElement>) {
        const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target?.result as string;
                processCSVData(contents);
            };
            reader.readAsText(file);
        }
    }

    function processCSVData(contents: string) {
        const rows = contents.split('\n');
        if (rows.length < 2) {
            console.error('Invalid CSV format');
            return;
        }

        const headers = rows[0].split(',');
        const dataRows = rows.slice(1);

        const albums: NewAlbum[] = [];

        dataRows.forEach((row) => {
            const values = row.split(',');
            if (values.length !== headers.length) {
                console.error('Invalid number of columns in CSV row');
                return;
            }

            const albumData: NewAlbum = {
                artist: values[0],
                title: values[1],
                format: values[2],
                releaseDate: values[3],
                imageUrl: values[4]
            };

            albums.push(albumData);
        });

        albums.forEach((album) => {
            props.addAlbum(album);
        });

        navigate("/albums");
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
                <label htmlFor="csv-upload">
                    <Button variant="contained" color="warning" component="span">
                        Datei auswählen
                    </Button>
                </label>
                <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    style={{ display: 'none' }}
                    onChange={onImportCSV}
                />
            </form>
        </div>
    );
}
