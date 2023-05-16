import useDetail from "../customHooks/UseDetail";
import {useNavigate} from "react-router-dom";
import './AlbumDetailCard.css'
import React from "react";

type AlbumDetailProps = {
    deleteAlbum: (barcode: string) => void
}

export default function AlbumDetailCard(props: AlbumDetailProps) {

    const {editedAlbum, album, editing, handleFormSubmit, editOnClick, albumInputChange } = useDetail()
    const navigate = useNavigate()
    function onDeleteClick() {
        if (album) {
            props.deleteAlbum(album.barcode)
        }
        navigate("/albums")
    }

    return (
        <div className="album-detail">

            {album ? (
                editing ? (
                    <form onSubmit={handleFormSubmit}>
                        <header> Release bearbeiten</header>
                        <input
                            type="text"
                            name="artist"
                            value={editedAlbum.artist}
                            onChange={albumInputChange}
                        />
                        <input
                            type="text"
                            name="title"
                            value={editedAlbum.title}
                            onChange={albumInputChange}
                        />
                        <input
                            type="text"
                            name="format"
                            value={editedAlbum.format}
                            onChange={albumInputChange}
                        />
                        <input
                            type="text"
                            name="releaseDate"
                            value={editedAlbum.releaseDate}
                            onChange={albumInputChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={editedAlbum.imageUrl}
                            onChange={albumInputChange}
                        />
                        <button type="submit">Speichern</button>
                    </form>
                ) : (
                    <div>
                        <header> Alle Infos zu diesem Release:</header>
                        <br/>
                        <p>Artist :{album.artist}</p>
                        <br/>
                        <p>Title :{album.title}</p>
                        <br/>
                        <img src={album.imageUrl} alt="Album-Cover" width="150" height="150"></img>
                        <br/>
                        <button onClick={editOnClick}>Release Bearbeiten</button>
                        <button onClick={onDeleteClick}>Release löschen</button>
                    </div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
