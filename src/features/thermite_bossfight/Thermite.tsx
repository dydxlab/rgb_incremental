import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectGrid,
  triggerThermite,
  enableButtons,
  selectStatus,
  calculateDamage, 
  startGrid
} from './thermiteSlice';
import styles from './Thermite.module.css';

export function Thermite() {
  const grid = useAppSelector(selectGrid);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  

  function getButtonStyle(cellValue, enabledButtons){
    if(status === 'idle'){
      return styles.button;
    }
    switch(cellValue) {
      case 0:  return styles.button;
      case 1:  return styles.buttonThermite;
      case 2:  return styles.buttonThermiteCorrect;
      case 3:  return styles.buttonThermiteWrong;
    }
  }

  function getBoard() {
    switch (status) {
          case 'idle': return (<div>
            <button className={styles.button} 
                  onClick={() =>  {
                    setTimeout(() => dispatch(startGrid()), 500);
                    setTimeout(() => dispatch(enableButtons()), 6500);
                     setTimeout(() => dispatch(calculateDamage()), 13000)
                    }
                  } 
                  
                  >Start</button>
                  {status}
            {grid && grid.map((row, i) => {
              return  (<div className={styles.row}>
              {row.map((cell, j) => 
                (<button disabled={true} className={getButtonStyle(cell, status)} 
                  
                  
                  >O</button>)
              )
              }
              
              </div>
            )})}
            
              
            
          </div>);
          case 'starting':
          case 'started': return (
            <div>
      {status === 'started' && <img src='./timeout_bar.svg' className="App-logo" alt="logo" />}
      {grid && grid.map((row, i) => {
        return  (<div className={styles.row}>
        {row.map((cell, j) => 
          (<button disabled={status !== 'started'} className={getButtonStyle(cell, status)} 
            onClick={() =>  dispatch(triggerThermite([i,j]))} 
            
            >O</button>)
        )
        }
        
        </div>
      )})}
      
        
      
    </div>
          )
          case 'finished': return (
            <div>{grid.flatMap(i => i).filter(i => i === 2).length}</div>
          )
    }
  }
  

  return (
    <div>
    {getBoard()}
</div>
  );
}
