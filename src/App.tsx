import React from 'react';
import logo from './Beetle.png';
import { Counter } from './features/counter/Counter';
import { CYOA } from './features/gameState/CYOA';
import { Draft } from './features/gameState/Draft';
import { TechTree } from './features/gameState/TechTree';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CYOA />
        <Draft />
        <TechTree />
        
      </header>
    </div>
  );
}

export default App;
