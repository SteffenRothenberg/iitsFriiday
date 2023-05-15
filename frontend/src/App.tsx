import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import useAlbums from "./customHooks/UseAlbums";
import Header from "./header/Header";
import AlbumGallery from "./gallery/AlbumGallery";
import AddAlbum from "./addProduct/AddAlbum";
import AlbumDetailCard from "./albumDetail/AlbumDetailCard";
import {LoginPage} from "./LoginPage";
import useUser from "./useUser";


function App() {
    const {albums, addAlbum, deleteAlbum} = useAlbums()
    const { user, login, logout, isLoading} = useUser();

    function handleLogout() {
        return new Promise<void>((resolve) => {
            logout();
            resolve();
        });
    }

    function handleLogin(username: string, password: string) {
        return login(username, password).catch((error) => {
            console.error('An error occurred during login:', error);
        });
    }
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>
              <Routes><Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>

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