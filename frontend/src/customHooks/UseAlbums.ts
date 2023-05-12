import axios from "axios";
import {useEffect, useState} from "react";
import {Album, NewAlbum} from "../model/Album";
import {toast} from "react-toastify";

export default function useAlbums(){
    const [albums, setAlbums] = useState<Album[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadAllAlbums()
    }, [])

    function loadAllAlbums(){
        axios.get("/api/albums")
            .then((getAllAlbums) => {
                setAlbums(getAllAlbums.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function addAlbum(newAlbum: NewAlbum){
        axios.post("/api/albums", newAlbum)
            .then(() => loadAllAlbums())
                .catch(() => console.error("post on /api/albums not successful"))
    }
    function deleteAlbum(id : string) {
        axios.delete('/api/albums/' + id)
            .then(() => {
                setAlbums(albums.filter((album) => album.barcode !== id))
                toast.success("Recipe deleted successfully");
            })
            .catch(console.error)
    }
    //const filteredAlbums = albums.filter((recipe) => recipe.artist.toLowerCase().includes(searchTerm.toLowerCase()));
    return {albums, addAlbum, deleteAlbum, searchTerm, setSearchTerm}
}