import React from 'react';
import ReactDOM from 'react-dom/client'; // Aquí asegúrate de usar la API correcta
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'; // Tu componente principal
import { AuthProvider } from './context/AuthContext'; // Ajusta la ruta si es necesario

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
