import React from 'react';
import ReactDOM from 'react-dom/client'; // API 
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'; // componente principal
import { AuthProvider } from './context/AuthContext'; // Provider

// Crear el root con React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar el árbol de la aplicación
root.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
