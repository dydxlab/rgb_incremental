import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {GameWrapper} from './GameWrapper'
import {
    clearGameLoopIntervals,
    setGameLoopIntervals,
    incrementRed,
    incrementGreen,
    incrementBlue,
    incrementHP,
    resetState,
    startLoop,
    selectRed,
    selectGreen,
    selectBlue,
    selectGreenFnP1,
    selectBlueDist,
    selectBluePast,
    selectGreenDist,
    selectRedDist,
    selectGameStatus
  } from './gameStateSlice';

import styles from './Counter.module.css';

export const GameOver: FunctionComponent = () => {
    let status = useAppSelector(selectGameStatus)
    const red = useAppSelector(selectRed);
    const redDist = useAppSelector(selectRedDist);
    const green = useAppSelector(selectGreen);
    const greenDist = useAppSelector(selectGreenDist);
    const blue = useAppSelector(selectBlue);
    const blueDist = useAppSelector(selectBlueDist);
    const bluePast = useAppSelector(selectBluePast);
    const gameStatus = useAppSelector(selectGameStatus);
    const dispatch = useAppDispatch();

    function initializeLoop() {
        // start timer after button is clicked
        if (gameStatus == 'ready' || gameStatus == 'victory' || gameStatus == 'gameOver') {
          dispatch(resetState())
          
          dispatch(startLoop());
          dispatch(clearGameLoopIntervals());
          let intval = setInterval(() => {
                dispatch(incrementRed());
                dispatch(incrementGreen());
                dispatch(incrementBlue());
                dispatch(incrementHP());
              },
              1000);
          dispatch(setGameLoopIntervals(intval))
        }
    }

    return (
        
        <div>
            {(() => { switch(status) {
                case 'victory': return <div><div className={styles.endScreen} style={{ 'color': 'gold' }} > <span>You Win!</span> </div>  <button
                className={styles.button}
                aria-label="start"
                onClick={initializeLoop}
              >
                Start
            </button></div>;
                case 'gameOver': return <div><div className={styles.endScreen} style={{ 'color': 'red' }} > <span>GAME OVER</span> </div>
                 <button
            className={styles.button}
            aria-label="start"
            onClick={initializeLoop}
          >
            Start
        </button>
                </div>
                default: return <GameWrapper></GameWrapper>
            }
            })()
        }
        </div>
    )
}
