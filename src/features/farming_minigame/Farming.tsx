import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectGrid,
  activateCell,
  enableButtons,
  selectStatus,
  startGrid,
  selectScore,
  selectMaxScore
} from './farmingSlice';
import styles from './Farming.module.css';

export function Farming() {
  const grid = useAppSelector(selectGrid);
  const score = useAppSelector(selectScore);
  const maxScore = useAppSelector(selectMaxScore);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
 


  function getButtonStyle(cellValue, enabledButtons) {
    if (status === 'idle') {
      return styles.button;
    }
    switch (cellValue) {
      case 0: return styles.button;
      case 1: return styles.greenInactive;
      case 2: return styles.blueInactive;
      case 3: return styles.redInactive;
      case 4: return styles.greenActive;
      case 5: return styles.blueActive;
      case 6: return styles.redActive;

    }
  }

  function runLoop() {
    console.log('loop')
    setTimeout(() => dispatch(startGrid()), 100);
    setTimeout(() => dispatch(enableButtons()), 100);
  }

  function getBoard() {
    switch (status) {
      case 'idle': return (<div>
        <div className={styles.row}>
        <button className={styles.button}
        style={{'backgroundColor': 'goldenrod', color:'white'}}
          onClick={runLoop
          }

        >Start</button>
        </div>
        {grid && grid.map((row, i) => {
          return (<div className={styles.row}>
            {row.map((cell, j) =>
            (<button disabled={true} className={getButtonStyle(cell, status)}


            >O</button>)
            )
            }

          </div>
          )
        })}



      </div>);
      case 'starting':
      case 'started': 
      case 'finished': return (
        <div>

          {grid && grid.map((row, i) => {
            return (<div className={styles.row}>
              {row.map((cell, j) =>
              (<button disabled={status === 'finished'} className={getButtonStyle(cell, status)}
                onClick={() => dispatch(activateCell([i, j]))}

              >O</button>)
              )
              }

            </div>
            )
          })}



        </div>
      )

    }
  }


  return (
    <div>
      <h3 style={{ 'color': 'rgb(222, 222, 222)' }}>Mushroom Minigame</h3>

      <br />
      {getBoard()}
      {status === 'finished' && (<div><h3 style={{'color':'rgb(255, 255, 255)'}}>Your Score:{score}</h3>
      <h3 style={{'color':'rgb(255, 255, 255)'}}>Max Possible Score:{maxScore}</h3>
      <div className={styles.row}>
      <button className={styles.button}
      style={{'backgroundColor': 'goldenrod', color:'white'}}
        onClick={runLoop
        }

      >Start</button>
      </div>
      </div>)
      }
    </div>
  );
}

//{status === 'started' && <img src='./timeout_bar.svg' className="App-logo" alt="logo" />}