import React from 'react';
import logo from './Beetle.png';
import { CYOA } from './features/gameState/CYOA';
import { Draft } from './features/gameState/Draft';
import { GameOver } from './features/gameState/GameOver';
import { TechTree } from './features/gameState/TechTree';
import { Maze } from './features/maze/Maze';
import { Thermite } from './features/thermite_bossfight/Thermite'
import { Farming } from './features/farming_minigame/Farming'
import './App.css';
import Particles from "react-tsparticles";



function App() {
  return (
    <div className="App">
      
      <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        background: {
          color: {
            value: "rgb(147,70,17)",
          },
          
          opacity: 0.01
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.2,
              size: 10,
            }, 
          },
        },
        particles: {
          color: {
            value: [
              "#921212",
              "#9e1b3e",
              "#c3711a",
              "#ff6b00"
            ]

          },
        
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "out",
            random: true,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 8,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: ["polygon", "circle"],
          },
          size: {
            random: true,
            value: 5,
          },
          rotate: {
            direction: "clockwise",
            animation: {
              enable: true,
              speed: 8
            }
          },
          zIndex: {
            opacityRate: 0.2,
            sizeRate: 0.5
          }
        },
        detectRetina: true,
      }}
      
      >
        </Particles>
      <header className="App-header" >
      
        
        <div style={{zIndex: 1, backgroundColor: 'rgba(85, 85, 85, 0.3)'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <Farming />
        </div>
      </header>
      
    </div>
  );
}

export default App;
