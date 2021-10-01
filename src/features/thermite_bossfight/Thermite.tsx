import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectGrid,
  triggerThermite,
  enableButtons,
  selectStatus,
  calculateDamage,
  startGrid,
  selectBossHP, 
  winThermiteBossFight
} from './thermiteSlice';
import styles from './Thermite.module.css';

export function Thermite() {
  const grid = useAppSelector(selectGrid);
  const bossHP = useAppSelector(selectBossHP);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
 


  function getButtonStyle(cellValue, enabledButtons) {
    if (status === 'idle') {
      return styles.button;
    }
    switch (cellValue) {
      case 0: return styles.button;
      case 1: return styles.buttonThermite;
      case 2: return styles.buttonThermiteCorrect;
      case 3: return styles.buttonThermiteWrong;
    }
  }

  function runLoop() {
    if(bossHP <= 0){ 
      dispatch(winThermiteBossFight())
      return
    }
    setTimeout(() => dispatch(startGrid()), 500);
    setTimeout(() => dispatch(enableButtons()), 6500);
    setTimeout(() => dispatch(calculateDamage()), 13000);
    setTimeout(() => runLoop(), 17000);
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
              (<button disabled={status !== 'started'} className={getButtonStyle(cell, status)}
                onClick={() => dispatch(triggerThermite([i, j]))}

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
      <h2 style={{ 'color': 'rgb(255, 255, 255)' }}>Volcano Boss</h2>
      <img src='./flying_dragon.gif' className="App-logo" style={{height:'192px', width:'192rpx'}}alt="logo" />
      <br></br>
      <svg xmlns="http://www.w3.org/2000/svg" width="350" height="50">
        <g>
          <rect id="svg_1" height="50" width={350 * (bossHP / 100)} y="0" x="0" stroke="#000" fill="#00b977" />
          <rect id="svg_2" height="50" width={350 - (350 * (bossHP / 100))} y="0" x={350 * (bossHP / 100)} stroke="#000" fill="#af1c1f" />
        </g>
      </svg>
      <br />
      {getBoard()}
    </div>
  );
}

//{status === 'started' && <img src='./timeout_bar.svg' className="App-logo" alt="logo" />}