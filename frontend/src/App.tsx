import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import useAlbums from "./customHooks/useAlbums";
import Header from "./header/Header";
import AlbumGallery from "./gallery/AlbumGallery";
import AddAlbum from "./addProduct/AddAlbum";


function App() {
  const {albums, addAlbum} = useAlbums()
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
              </Routes>
          </div>
      </BrowserRouter>
  );
}
export default App;