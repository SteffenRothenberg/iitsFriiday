import {Album} from "./Album";
import {useNavigate} from "react-router-dom";
import './AlbumCard.css'

type AlbumProps ={
    album: Album
}
export default function AlbumCard(props: AlbumProps){
    const navigate = useNavigate()
    return(
        <div className="album-card">
            <p>Barcode:</p>
            {props.album.barcode}
            <p>Artist:</p>
            {props.album.artist}
            <p>Title:</p>
            {props.album.title}
            <p>Format:</p>
            {props.album.format}
            <p>Release-Date:</p>
            {props.album.releaseDate}
            <br/>
            <button onClick={() => {navigate("/api/albums/" + props.album.barcode)}}>Album-Details</button>
        </div>
    )
}