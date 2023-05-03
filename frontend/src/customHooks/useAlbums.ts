import axios from "axios";
import {useEffect, useState} from "react";
import {Album} from "../model/Album";

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
    return {albums}
}