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
        <svg xmlns="http://www.w3.org/2000/svg" height="150px" width="150px" fill="#b2b2b2" viewBox="0 0 64 64" x="0px" y="0px">
          <path d="M19.631,36.864A1,1,0,0,0,20.369,35c-.06-.023-.117-.05-.177-.074L21.9,24.688c.363.027.721.053,1.088.083-.13,10.067-2.308,23.656-3.627,31A7,7,0,0,0,26.252,64H39.238a6.994,6.994,0,0,0,6.935-7.953c-.378-2.729-1.417-9.59-3.2-17.076,4.679-.153,17.295-1.063,20.864-6.416a1,1,0,0,0,.155-.714C63.936,31.522,58.521,0,30,0,1.376,0,.012,22.725,0,22.955a1,1,0,0,0,.26.718A57.524,57.524,0,0,0,19.631,36.864ZM16.6,24.341l-2.129,7.808c-1.055-.6-2.058-1.215-3.006-1.837L14.5,24.236C15.181,24.267,15.881,24.3,16.6,24.341Zm-6.8,4.836q-1.236-.874-2.3-1.713l2.043-3.406c.876.023,1.8.051,2.779.087ZM5.914,26.2c-1.009-.843-1.851-1.6-2.511-2.222,1,0,2.288,0,3.826.031ZM18.3,34.115c-.692-.316-1.365-.647-2.025-.987l2.363-8.668c.412.025.838.056,1.258.084ZM34.878,24.046c-3.389-.462-6.71-.824-9.872-1.1a5,5,0,1,1,9.872,1.1Zm8.135,36.237A5,5,0,0,1,39.238,62H26.252a4.994,4.994,0,0,1-4.923-5.873c1.323-7.372,3.5-20.987,3.656-31.185,3.855.343,7.945.809,12.1,1.433,4.258,10.944,6.515,25.644,7.111,29.946A4.983,4.983,0,0,1,43.013,60.283Zm-3.657-33.55c.648.107,1.3.216,1.944.331l3.278,9.83c-.737.043-1.439.072-2.1.088A102.933,102.933,0,0,0,39.356,26.733ZM56,30.545v4.529c-.644.2-1.313.373-2,.534V29.95Q55.008,30.24,56,30.545Zm-4,5.479c-.378.07-.755.135-1.136.2l-1.5-7.488q1.328.318,2.634.665ZM47.228,28.24,48.881,36.5c-.759.094-1.51.174-2.246.239l-3.089-9.266Q45.4,27.832,47.228,28.24ZM58,34.368V31.191c1.133.383,2.235.794,3.319,1.219A11.188,11.188,0,0,1,58,34.368ZM54.939,15.051a42.8,42.8,0,0,1,4.619,8.694,4.994,4.994,0,0,1-4.619-8.694ZM39.586,3.422A27.9,27.9,0,0,1,49.964,9.363,6,6,0,0,1,39.586,3.422Zm-1.945-.537A7.993,7.993,0,0,0,51.417,10.77a33.082,33.082,0,0,1,2.332,2.673,6.99,6.99,0,0,0,6.509,12.174,46.755,46.755,0,0,1,1.393,4.774,118.874,118.874,0,0,0-24.78-6.062,7,7,0,1,0-13.86-1.556c-9.971-.8-18.032-.815-20.9-.788A22.525,22.525,0,0,1,3.723,16.3,7.994,7.994,0,0,0,15,9a7.872,7.872,0,0,0-.906-3.682C18,3.331,23.163,2,30,2A32.564,32.564,0,0,1,37.641,2.885ZM12.348,6.3A5.993,5.993,0,0,1,4.6,14.5,21.6,21.6,0,0,1,12.348,6.3Z">
          <animateTransform attributeName="transform" attributeType="XML" type="skewY" values="1;-1;1;-1;1;" additive="sum" repeatCount="indefinite" dur="6s" fill="freeze"/>
      
          </path>
          <path d="M26.918,48.034a1.006,1.006,0,0,0-1.225.707,12.368,12.368,0,0,1-.588,1.812,1,1,0,0,0,1.79.894,12.993,12.993,0,0,0,.73-2.188A1,1,0,0,0,26.918,48.034Z">
          <animateTransform attributeName="transform" attributeType="XML" type="skewY" values="1;-1;1;-1;1;" additive="sum" repeatCount="indefinite" dur="6s" fill="freeze"/>
      
          </path>
          <path d="M27.758,30.03a1,1,0,0,0-.728,1.213c.009.038.942,3.887-.02,10.616q-.153,1.065-.3,1.978a1,1,0,0,0,.823,1.15,1.034,1.034,0,0,0,.164.013,1,1,0,0,0,.986-.837c.1-.623.207-1.3.31-2.021,1.016-7.113.023-11.213-.02-11.385A1,1,0,0,0,27.758,30.03Z">
          <animateTransform attributeName="transform" attributeType="XML" type="skewY" values="1;-1;1;-1;1;" additive="sum" repeatCount="indefinite" dur="6s" fill="freeze"/>
      
          </path>
          <path d="M33.341,46.92a1,1,0,0,0-1.28.6,11.342,11.342,0,0,1-.918,1.964,1,1,0,1,0,1.714,1.03A13.1,13.1,0,0,0,33.941,48.2,1,1,0,0,0,33.341,46.92Z" >
          <animateTransform attributeName="transform" attributeType="XML" type="skewY" values="1;-1;1;-1;1;" additive="sum" repeatCount="indefinite" dur="6s" fill="freeze"/>
      
          </path>
          <path d="M33.876,36.008a1,1,0,0,0-.868,1.116,29.669,29.669,0,0,1,0,6.032,1,1,0,0,0,.889,1.1.955.955,0,0,0,.106.006,1,1,0,0,0,.993-.9,31.242,31.242,0,0,0,0-6.491A1,1,0,0,0,33.876,36.008Z">
          <animateTransform attributeName="transform" attributeType="XML" type="skewY" values="1;-1;1;-1;1;" additive="sum" repeatCount="indefinite" dur="6s" fill="freeze"/>
      
          </path>
          <path d="M37.01,44.142l1,7a1,1,0,1,0,1.98-.284l-1-7a1,1,0,0,0-1.98.284Z">
            <animateTransform attributeName="transform" attributeType="XML" type="skewY" values="1;-1;1;-1;1;" additive="sum" repeatCount="indefinite" dur="6s" fill="freeze"/>
      
          </path>
          <path d="M61,53c0-.964-.123-9.459-4.4-10.978-2.728-.969-6.12,1.109-10.375,6.348a1,1,0,0,0-.119,1.077c.14.278,1.055,1.838,4.146,3.056a33.757,33.757,0,0,1-.8,8.963,1.963,1.963,0,0,0,.327,1.734,2,2,0,0,0,1.605.8h4.6a1.978,1.978,0,0,0,1.434-.609,2.033,2.033,0,0,0,.565-1.478,51.524,51.524,0,0,0-1.064-8.036C57.867,53.95,58.878,54,60,54A1,1,0,0,0,61,53Zm-5.02,9-4.608.015a35.888,35.888,0,0,0,.9-8.865,23.808,23.808,0,0,0,2.557.506A50.855,50.855,0,0,1,55.98,62ZM48.289,49.01c4.389-5.216,6.662-5.449,7.64-5.1,2.171.77,2.885,5.49,3.038,8.081C51.986,51.815,49.219,49.917,48.289,49.01Z">
          
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" values="-3, 60, 80;3, 60,80;-3,60,80" dur="3s" additive="sum" repeatCount="indefinite" />
          </path>
        
        <animate attributeName="fill" values="b2b2b2;704cb6;b2b2b2;" dur="8s" repeatCount="indefinite"/>
        
      
      

        </svg>
        <GameOver/>
        </div>
      </header>
      
    </div>
  );
}

export default App;
