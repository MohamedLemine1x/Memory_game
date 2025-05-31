import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Main.tsx: Point d'entrée principal de l'application React
// Mots clés: 
// - StrictMode: Mode strict de React pour détecter les problèmes potentiels
// - createRoot: Méthode React 18 pour le rendu de l'application
// - render: Méthode pour monter l'application dans le DOM