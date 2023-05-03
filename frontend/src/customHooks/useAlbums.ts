import axios from "axios";
import {useEffect, useState} from "react";
import {Album, NewAlbum} from "../model/Album";

export default function useAlbums(){
    const [albums, setAlbums] = useState<Album[]>([])

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
    return {albums, addAlbum}
}