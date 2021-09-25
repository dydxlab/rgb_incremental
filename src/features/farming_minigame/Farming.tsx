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
      <h3 style={{ 'color': 'rgb(222, 222, 222)'  }}>Mushroom Minigame</h3>
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Red mushrooms give 1 point and add 1 point to active diagonal mushrooms</span><br/>
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Green mushrooms give 3 point and set active mushrooms to the left and right to 0 points</span><br/>
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Blue mushrooms give 2 points and add 1 point to active mushrooms above and below them</span><br/>
      <br />
      {getBoard()}
      {status === 'finished' && (<div><span style={{'color':'rgb(255, 255, 255)'}}>Your Score:{score}</span>
      <br/>
      <span style={{'color':'rgb(255, 255, 255)'}}>Max Possible Score:{maxScore}</span>
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