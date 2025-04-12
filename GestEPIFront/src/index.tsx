// ********** IMPORTS **********
// React : La bibliothèque de base pour créer notre interface
import React from 'react';
// ReactDOM : Permet de rendre notre application React dans le navigateur
import ReactDOM from 'react-dom/client';
// App : Notre composant principal qui contient toute l'application
import App from './App';

// ********** POINT D'ENTRÉE DE L'APPLICATION **********
// On crée la racine de notre application React
// C'est comme le "point de départ" où tout commence
const root = ReactDOM.createRoot(
  // On cherche l'élément HTML avec l'id 'root' dans notre fichier index.html
  document.getElementById('root') as HTMLElement
);

// On rend notre application dans le navigateur
root.render(
  // StrictMode : Un outil de développement qui aide à détecter les problèmes potentiels
  <React.StrictMode>
    {/* On commence par afficher notre composant App */}
    <App />
  </React.StrictMode>
);

/*
RÉSUMÉ DU FICHIER index.tsx :
Ce fichier est le POINT DE DÉPART de notre application React. C'est comme le "starter" qui lance tout !

1. RÔLE PRINCIPAL :
   - C'est le premier fichier qui s'exécute quand l'application démarre
   - Il "monte" (render) notre application React dans le navigateur
   - Il attache notre application à l'élément HTML 'root' dans index.html

2. FONCTIONNEMENT :
   - Importe les bibliothèques nécessaires
   - Crée une "racine" React
   - Active le mode strict pour la détection des erreurs
   - Lance notre composant App qui contient toute l'application

3. IMPORTANCE :
   - C'est le "pont" entre le HTML et notre application React
   - Sans ce fichier, notre application ne pourrait pas s'afficher dans le navigateur
   - C'est comme le "bouton d'alimentation" de notre application !

C'est un fichier simple mais essentiel, comme la clé de contact d'une voiture !
*/
