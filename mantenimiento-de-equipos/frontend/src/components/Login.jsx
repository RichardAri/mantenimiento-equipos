// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Login.css';
import Clock from './Clock';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, `${email}@example.com`, password);
            alert('Login exitoso');
            navigate('/tiendas'); // Redirigir a la página de lista de tiendas
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="login-page">
            <Clock />
            <div className="login-container">
                <h1>Control De Mantenimiento</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
