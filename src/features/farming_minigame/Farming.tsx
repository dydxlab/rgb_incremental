import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectGrid,
  selectGridSize,
  setGridSize,
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
  const gridSize = useAppSelector(selectGridSize);
  const score = useAppSelector(selectScore);
  const maxScore = useAppSelector(selectMaxScore);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const audio = new Audio("./MushroomBluegrass.mp3")
  audio.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);

  const activateCellAudio = new Audio("./activate_cell3.wav")
  activateCellAudio.volume = 0.3

  const deactivateCellAudio = new Audio("./deactivate_cell.wav")
  deactivateCellAudio.volume = 0.3

  const perfectScoreAudio = new Audio("./perfect_score.wav")
  const finishRoundAudio = new Audio("./finish_round.wav")





  function getButtonStyle(cellValue, enabledButtons) {
    if (status === 'idle') {
      return styles.button;
    }
    if (cellValue > 6) {
      cellValue -= 6;
      switch (cellValue) {
        case 0: return styles.button + ' ' + styles.optimal;
        case 1: return styles.greenInactive + ' ' + styles.optimal;
        case 2: return styles.blueInactive + ' ' + styles.optimal;
        case 3: return styles.redInactive + ' ' + styles.optimal;
        case 4: return styles.greenActive + ' ' + styles.optimal;
        case 5: return styles.blueActive + ' ' + styles.optimal;
        case 6: return styles.redActive + ' ' + styles.optimal;


      }
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
    if(audio.paused){
      audio.volume = 0.2;
      audio.play();
    }
    setTimeout(() => dispatch(startGrid()), 100);
    setTimeout(() => dispatch(enableButtons()), 100);
    
  }

  function clickCell(coord) {
    if(grid[coord[0]][coord[1]] > 3){
      deactivateCellAudio.play();
    } else {
      activateCellAudio.play();
    }
    
    dispatch(activateCell(coord))
  }

  function getBoard() {
    switch (status) {
      case 'idle': return (<div>
        <div className={styles.row}>
          <button className={styles.button}
            style={{ 'backgroundColor': 'goldenrod', color: 'white' }}
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
                onClick={() => clickCell([i, j])}

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

  {status === 'finished' && score > 0 && score === maxScore && perfectScoreAudio.play()}
  {status === 'finished' && score > 0 && score !== maxScore && finishRoundAudio.play()}
  return (
    <div>
      <h3 style={{ 'color': 'rgb(222, 222, 222)' }}>Mushroom Minigame</h3>
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Red mushrooms give 1 point and add 1 point to active diagonal mushrooms</span><br />
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Green mushrooms give 3 point and set active mushrooms to the left and right to 0 points</span><br />
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Blue mushrooms give 2 points and add 1 point to active mushrooms above and below them</span><br />
      <br />
      {getBoard()}
      {status === 'finished' && (<div><span style={{ 'color': 'rgb(255, 255, 255)' }}>Your Score:{score}</span>
        <br />
        <span style={{ 'color': 'rgb(255, 255, 255)' }}>Max Possible Score:{maxScore}</span>
        
        <div className={styles.row}>
        <label style={{ 'color': 'rgb(255, 255, 255)',  'paddingRight':'12px' }}>
          <input type="radio" name="gridsize3x3"
            value={3}
            checked={gridSize === 3}
            onChange={() => dispatch(setGridSize(3))} /> 3X3</label>
          <label style={{ 'color': 'rgb(255, 255, 255)' ,  'paddingRight':'12px'}}>
          <input type="radio" name="gridsize4x4"
            value={4}
            checked={gridSize === 4}
            onChange={() => dispatch(setGridSize(4))} />4X4</label>
          
          <label style={{ 'color': 'rgb(255, 255, 255)', 'paddingRight':'12px' }}>
          <input type="radio" name="gridsize5x5"
            value={5}
            checked={gridSize === 5}
            onChange={() => dispatch(setGridSize(5))} />5X5</label>
          <button className={styles.button}
            style={{ 'backgroundColor': 'goldenrod', color: 'white' }}
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