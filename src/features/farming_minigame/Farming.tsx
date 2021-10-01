import React, { useState, FunctionComponent } from 'react';
import ReactDOM from 'react-dom'

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
  selectMaxScore,
  activeCellStatuses,
  CellStatus,
  selectFreshAchievements
} from './farmingSlice';
import styles from './Farming.module.css';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FarmingProps {
  id: string;
}

export const Farming: FunctionComponent = () => {
  const grid = useAppSelector(selectGrid);
  const gridSize = useAppSelector(selectGridSize);
  const score = useAppSelector(selectScore);
  const maxScore = useAppSelector(selectMaxScore);
  const status = useAppSelector(selectStatus);
  const freshAchievements = useAppSelector(selectFreshAchievements);

  const dispatch = useAppDispatch();


  const activateCellAudio = new Audio("./activate_cell3.wav")
  activateCellAudio.volume = 0.3

  
  const deactivateCellAudio = new Audio("./deactivate_cell.wav")
  deactivateCellAudio.volume = 0.3

  const perfectScoreAudio = new Audio("./perfect_score.wav")
  const achievementAudio = new Audio("./achievement_unlocked2.wav")
  achievementAudio.volume = 0.05
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


  function getButtonStyleCellStatus(cellValue: CellStatus, enabledButtons) {
    if (status === 'idle') {
      return styles.button;
    }

    switch (cellValue) {
      case 'GreenActive': return styles.greenActive;
      case 'GreenInactive': return styles.greenInactive;
      case 'RedActive': return styles.redActive;
      case 'RedInactive': return styles.redInactive;
      case 'BlueActive': return styles.blueActive;
      case 'BlueInactive': return styles.blueInactive;

      case 'GreenActiveHighlighted': return styles.greenActive + ' ' + styles.optimal;
      case 'GreenInactiveHighlighted': return styles.greenInactive + ' ' + styles.optimal;
      case 'RedActiveHighlighted': return styles.redActive + ' ' + styles.optimal;
      case 'RedInactiveHighlighted': return styles.redInactive + ' ' + styles.optimal;
      case 'BlueActiveHighlighted': return styles.blueActive + ' ' + styles.optimal;
      case 'BlueInactiveHighlighted': return styles.blueInactive + ' ' + styles.optimal;

      case 'Neutral': return styles.button;
      default: return styles.button;

    }
  }

  function runLoop() {
    setTimeout(() => dispatch(startGrid()), 100);
    setTimeout(() => dispatch(enableButtons()), 100);

  }

  function clickCell(coord) {
    if (activeCellStatuses.includes(grid[coord[0]][coord[1]])) {
      deactivateCellAudio.play();
    } else {
      activateCellAudio.play();
    }

    dispatch(activateCell(coord))
  }

  function notify() {
    if (freshAchievements && freshAchievements.length) {
      freshAchievements.flatMap(a => 
      toast.success(a.title, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: a.title
      })
      )
    }
  }

  function playEndRoundAudio(){
    if(score === maxScore && freshAchievements.length){
      achievementAudio.play()
    } else if(score === maxScore && !freshAchievements.length){
      perfectScoreAudio.play()
    } else if(score !== maxScore){
      finishRoundAudio.play()
    }
    
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
            (<button disabled={true} className={getButtonStyleCellStatus(cell, status)}


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
              (<button disabled={status === 'finished'} className={getButtonStyleCellStatus(cell, status)}
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

  { status === 'finished' && score > 0 && playEndRoundAudio()  }
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <h3 style={{ 'color': 'rgb(222, 222, 222)' }}>Mushroom Minigame</h3>
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Red mushrooms give 1 point and add 2 points to active diagonal mushrooms</span><br />
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Green mushrooms give 4 point and set active mushrooms to the left and right to 0 points</span><br />
      <span style={{ 'color': 'rgb(222, 222, 222)' }}>Blue mushrooms give 0 points and add 3 points to active mushrooms above and below them</span><br />
      <br />
      {getBoard()}
      {status === 'finished' && (<div><span style={{ 'color': 'rgb(255, 255, 255)' }}>Your Score:{score}</span>
        <br />
        <span style={{ 'color': 'rgb(255, 255, 255)' }}>Max Possible Score:{maxScore}</span>

        <div className={styles.row}>
          <label style={{ 'color': 'rgb(255, 255, 255)', 'paddingRight': '12px' }}>
            <input type="radio" name="gridsize3x3"
              value={3}
              checked={gridSize === 3}
              onChange={() => dispatch(setGridSize(3))} /> 3X3</label>
          <label style={{ 'color': 'rgb(255, 255, 255)', 'paddingRight': '12px' }}>
            <input type="radio" name="gridsize4x4"
              value={4}
              checked={gridSize === 4}
              onChange={() => dispatch(setGridSize(4))} />4X4</label>

          <label style={{ 'color': 'rgb(255, 255, 255)', 'paddingRight': '12px' }}>
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
      {status === 'finished' && notify()}
    </div>
  );
}

//{status === 'started' && <img src='./timeout_bar.svg' className="App-logo" alt="logo" />}