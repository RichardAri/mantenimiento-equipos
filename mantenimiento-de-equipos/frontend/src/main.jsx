import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App'; // El componente principal de tu aplicación
import { AuthProvider } from './context/AuthContext'; // Contexto de autenticación
import { TiendasProvider } from './context/TiendasContext'; // Contexto de tiendas
import { BrowserRouter } from 'react-router-dom'; // Envolvemos toda la aplicación en BrowserRouter

// Crear el root con React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos el árbol de la aplicación con los contextos y el enrutamiento
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Solo un BrowserRouter a nivel de la raíz */}
      <AuthProvider>
        <TiendasProvider>
          <App />
        </TiendasProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
