// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ListaTiendas from './components/ListaTiendas';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/tiendas" element={<ListaTiendas />} />
            </Routes>
        </div>
    );
}

export default App;
