// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';

// == Import : local
// Styles de base
import 'src/styles/index.scss';
// Composant racine
import App from 'src/components/App';
import store from 'src/store';

WebFont.load({
  google: {
    families: ['Varela Round Web:400', 'sans-serif'],
  },
});


// == Render
// 1. Le composant racine (celui qui contient l'ensemble de l'app)
const rootComponent = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');

// Le rendu de React => DOM
render(rootComponent, target);
