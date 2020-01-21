// == Import : npm
import React from 'react';
import Osteopathie from './components/Osteopathie'
import Pilates from './components/Pilates'


// == Import : local
import './app.scss';

// == Composant
const App = () => (
  <div id="app">
    <header>
      <div className="logo">Logo</div>
      <div className="profil">Compte</div>
    </header>
    <main>
      <button className="osteopathie">OSTEOPATHIE</button>
      <button className="pilates">PILATES</button>
    </main>
    <footer>
      <div className="infos">Infos</div>
    </footer>
  </div>
);

// == Export
export default App;
