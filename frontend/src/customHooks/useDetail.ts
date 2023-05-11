import {Album} from "../model/Album";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function useDetail(){
    const initialState = {barcode: "", artist: "", title: "", format: "", releaseDate:""}
    const [album, setAlbum] = useState <Album>(initialState);
    const [editing, setEditing] = useState(false);
    const [editedAlbum, setEditedAlbum] = useState<Album>({
        barcode: "",
        artist: "",
        title: "",
        format: "",
        releaseDate:""
    });
    const {barcode} = useParams<{barcode: string}>();

    useEffect(() => void{
        if (barcode: string) {
            loadAlbumById(barcode);
        }
        //eslint-disable-next-line
    }, []);
    function loadAlbumById(barcode: string) {
        axios
            .get("/api/albums/" + barcode)
            .then((response)=>{
                setAlbum(response.data);
                setEditedAlbum(response.data);
            })
            .catch((error) =>{
                toast.error("Album does not exist");
                })}
    function editOnClick(){
        setEditing(true);
    }

    function albumInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setEditedAlbum((prevAlbum) => ({
            ...prevAlbum,
            [name]: value,
        }));
    }
    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios
            .put("/api/albums/" + barcode, editedAlbum)
            .then((response) => {
                setAlbum(response.data);
                setEditing(false);
                window.location.reload();
                toast.success("Album updated successfully");
            })
            .catch((error) => {
                toast.error("Failed to update Album");
            });
    }
    return {editedAlbum, album, editing, handleFormSubmit, editOnClick, albumInputChange}
}