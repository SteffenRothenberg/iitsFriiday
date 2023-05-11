import useDetail from "../customHooks/useDetail";
import {useNavigate} from "react-router-dom";
import {Album} from "../model/Album";
import './AlbumDetail.css'

type AlbumDetailProps = {
    album: Album
    deleteAlbum: (barcode: string) => void
}

export default function AlbumDetail(props: AlbumDetailProps){

    const {editedAlbum, album, editing, handleFormSubmit, editOnClick, albumInputChange} = useDetail()
    const navigate = useNavigate()

    function onDeleteClick() {
        if (album) {
            props.deleteAlbum(album.barcode)
        }

        navigate("/recipes")
    }
    return (
        <div className="album-detail">
        {album ? (
            <form onSubmit={handleFormSubmit}>
                <header> Release bearbeiten</header>
                <input
                    type="text"
                    name="Artist"
                    value={editedAlbum.artist}
                    onChange={albumInputChange}
                />
                <input
                    type="text"
                    name="Title"
                    value={editedAlbum.title}
                    onChange={albumInputChange}
                />
                <input
                    type="text"
                    name="Format"
                    value={editedAlbum.format}
                    onChange={albumInputChange}
                />
                <input
                    type="text"
                    name="Release-Date"
                    value={editedAlbum.releaseDate}
                    onChange={albumInputChange}
                />
            </form>
        ) : (
            <div>
                <header> Alle Infos zu diesem Release:</header>
                <br />
                <p>{props.album.artist}</p>
                <br />
                <p>{props.album.title}</p>
                <br />
                <p>{props.album.format}</p>
                <br />
                <p>{props.album.releaseDate}</p>
                <br />
                <button onClick={editOnClick}>Release Bearbeiten</button>
                <button onClick={onDeleteClick}>Release löschen</button>
            </div>
        )}
    </div>
    );
}
