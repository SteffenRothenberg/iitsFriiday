import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import useAlbums from "./customHooks/UseAlbums";
import Header from "./header/Header";
import AlbumGallery from "./gallery/AlbumGallery";
import AddAlbum from "./addProduct/AddAlbum";
import AlbumDetailCard from "./albumDetail/AlbumDetailCard";


function App() {
  const {albums, addAlbum, deleteAlbum} = useAlbums()
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>
              <Routes>
                  <Route element={<Navigate to="/albums"/>}/>
                  <Route path="/albums"
                         element={<AlbumGallery albums={albums}/>}/>
                  <Route path="/albums/add"
                         element={<AddAlbum addAlbum={addAlbum}/>}/>
                  <Route path="/albums/:barcode"
                         element={<AlbumDetailCard deleteAlbum={deleteAlbum}/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}
export default App;