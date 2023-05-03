import {NewAlbum} from "../model/Album";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './AddAlbum.css'

type AddAlbumProps = {
    addAlbum: (newAlbum: NewAlbum) => void
}

export default function AddAlbum(props: AddAlbumProps){
    const [artist, setArtist] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [format, setFormat] = useState<string>("")
    const [releaseDate, setReleaseDate] = useState<string>("")
    const navigate = useNavigate()

    function onSaveAlbum(event: FormEvent<HTMLFormElement>){

        event.preventDefault()

        const newAlbum: NewAlbum = {artist: artist,title: title, format: format, releaseDate: releaseDate}

        props.addAlbum(newAlbum)

        navigate("/albums")
    }
    return (
        <div>
            <form onSubmit={onSaveAlbum}>
                <p>Arist:</p>
                <input type="text"
                       value={artist}
                       onChange={(event) => {
                           setArtist(event.target.value)
                       }}/>
                <p>Title:</p>
                <textarea
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}/>
                <br/>
                <p>Format:</p>
                <textarea
                    value={format}
                    onChange={(event) => {
                        setFormat(event.target.value)
                    }}/>
                <br/>
                <p>ReleaseDate:</p>
                <textarea
                    value={releaseDate}
                    onChange={(event) => {
                        setReleaseDate(event.target.value)
                    }}/>
                <br/>
                <button>Album speichern</button>
            </form>
        </div>
    )
}