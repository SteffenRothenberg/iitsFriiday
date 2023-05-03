import {Album} from "../model/Album";
import {useState} from "react";
import useAlbums from "../customHooks/useAlbums";
import AlbumCard from "../card/AlbumCard";
import './AlbumGallery.css'

type AlbumGalleryProps = {
    albums: Album[],
}
export default function AlbumGallery(props: AlbumGalleryProps){
    const [searchTerm, setSearchTerm] = useState("");
    const {albums} = useAlbums()
    const filteredAlbums = albums.filter((album) =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="album-gallery">
            <div className="actionbar">
                <input
                    type="text"
                    placeholder="AlbumTitel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {filteredAlbums.map((card : Album) => (
                <AlbumCard key={card.barcode} album={card} />
            ))}
        </div>
    )
}