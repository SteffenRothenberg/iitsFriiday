import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import useAlbums from "./customHooks/UseAlbums";
import Header from "./header/Header";
import AlbumGallery from "./gallery/AlbumGallery";
import AddAlbum from "./addProduct/AddAlbum";
import AlbumDetailCard from "./albumDetail/AlbumDetailCard";
import {LoginPage} from "./routesAndLogIns/LoginPage";
import useUser from "./customHooks/useUser";
import HomePage from "./HomePage";
import ProtectedRoutes from "./routesAndLogIns/ProtectedRoutes";
import {SignUpPage} from "./routesAndLogIns/SignUpPage";


function App() {
    const {albums, addAlbum, deleteAlbum, loadAllAlbums} = useAlbums()
    const {user, login, logout, isLoading, createUser} = useUser();

    useEffect(() => {
        if (user) {
            loadAllAlbums();
        }
        //eslint-disable-next-line
    }, []);

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
                <Header onLogout={handleLogout}/>
                <Routes>
                    <Route path="/signup" element={<SignUpPage createUser={createUser}/>}/>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route element={<ProtectedRoutes user={user} isLoading={isLoading}/>}>
                        <Route element={<Navigate to="/albums"/>}/>
                        <Route path="/albums"
                               element={<AlbumGallery albums={albums}/>}/>
                        <Route path="/albums/add"
                               element={<AddAlbum addAlbum={addAlbum}/>}/>
                        <Route path="/albums/:barcode"
                               element={<AlbumDetailCard deleteAlbum={deleteAlbum}/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;