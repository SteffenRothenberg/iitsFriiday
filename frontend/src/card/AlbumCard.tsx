import {Album} from "../model/Album";
import {useNavigate} from "react-router-dom";
import './AlbumCard.css'
import React from "react";

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
            <img src={props.album.imageUrl} alt="No Picture!" width="150" height="150"></img>
            <br/>
            <button onClick={() => {navigate("/albums/" + props.album.barcode)}}>Album-Details</button>
        </div>
    )
}