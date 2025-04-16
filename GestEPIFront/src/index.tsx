// 📄 Fichier : index.tsx
// 📌 Ce fichier fait partie du projet GestEPI (application de gestion des EPI pour cordistes)
// 🧩 Rôle : Point d'entrée principal de l'application React, initialise et monte l'application dans le DOM
// 🔄 Interagit avec : index.html, App.tsx, ReactDOM
// 👶 Niveau débutant : Ce fichier est comme le "démarreur" qui lance toute l'application !

// ===== IMPORTS ESSENTIELS =====
// React est notre bibliothèque principale pour créer l'interface utilisateur
// C'est comme avoir une boîte à outils pour construire des pages web interactives
import React from 'react';

// ReactDOM est l'outil qui permet d'afficher du React dans le navigateur
// C'est comme un interprète qui traduit notre code React en pages web
import ReactDOM from 'react-dom/client';

// App est notre composant racine qui contient toute l'application
// C'est comme le plan général de notre maison, tous les autres composants sont à l'intérieur
import App from './App';

// ===== CRÉATION DU POINT DE MONTAGE =====
// On crée un point d'ancrage pour notre application React
// C'est comme choisir l'emplacement où on va construire notre maison
const root = ReactDOM.createRoot(
  // On cherche dans le HTML l'élément avec l'id 'root'
  // Le "as HTMLElement" dit à TypeScript : "fais-moi confiance, cet élément existe"
  document.getElementById('root') as HTMLElement
);

// ===== RENDU DE L'APPLICATION =====
// On "monte" notre application dans le DOM (la page web)
// C'est comme construire notre maison à l'emplacement choisi
root.render(
  // StrictMode est un outil de développement qui nous aide à trouver des bugs
  // C'est comme avoir un inspecteur qui vérifie la qualité de notre construction
  <React.StrictMode>
    {/* App est notre composant principal, tout part de lui */}
    {/* C'est comme poser la première pierre de notre maison */}
    <App />
  </React.StrictMode>
);

/*
===== RÉSUMÉ DU FICHIER index.tsx =====
🎯 Ce fichier est CRUCIAL car :
1. C'est le premier fichier exécuté au démarrage
2. Il connecte React au HTML de base (index.html)
3. Il initialise l'application avec les bonnes pratiques (StrictMode)

🔍 Points techniques importants :
- Utilise la nouvelle API "createRoot" de React 18
- Active le StrictMode pour un développement plus sûr
- Utilise TypeScript pour la sécurité du typage

⚠️ Points d'attention :
- L'élément 'root' doit exister dans index.html
- StrictMode peut causer des rendus doubles en développement (c'est normal !)
- Ce fichier ne doit pas être trop modifié une fois configuré

🌟 C'est comme le "bouton power" de l'application : 
simple mais essentiel !
*/
