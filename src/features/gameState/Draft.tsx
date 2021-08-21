import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  
  incrementRed,
  incrementGreen,
  incrementGreenFnP1,
  startLoop,
  selectRed,
  selectGreen,
  selectBlue,
  selectGreenFnP1,
  selectLoopStarted
} from './counterSlice';
import styles from './Counter.module.css';

function getCards() {
  const cards = ['card1', 'card2', 'card3'];
  const players = ['player1', 'player2'];

  return ( <React.Fragment>
    {cards.map( c => <div>text</div>)}
  </React.Fragment>
  )
}

/*cards.map((card) => return (
      <div>card</div>
  ))*/
export const Draft : FunctionComponent = () => {
  const red = useAppSelector(selectRed);
  const green = useAppSelector(selectGreen);
  const blue = useAppSelector(selectBlue);
  const loopStarted = useAppSelector(selectLoopStarted);
  
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

//  onClick={() => dispatch(incrementAsync(incrementred))}

  function startRed() {
    // start timer after button is clicked
    if(!loopStarted){
      dispatch(startLoop())
      setInterval(() => dispatch(incrementRed()), 1000);
      setInterval(() => dispatch(incrementGreen()), 1000);
    } 
  }


  return (
    <div>
      <div className={styles.row}>
        
      <span className={styles.value} style={{'color':'red'}}>{red}</span>

      <span className={styles.value} style={{'color':'limegreen'}}>{green}</span>
      <span className={styles.value} style={{'color':'steelblue'}}>{blue}</span>

        
      </div>
      <div className={styles.row}>

      <button
          className={styles.button}
          aria-label="Increment red"
          onClick={startRed}
        >
          Start
        </button>
        </div>
        
        
        <div className={styles.row}>
          <button
              className={styles.button}
              aria-label="Increment green P1"
              onClick={() => dispatch(incrementGreenFnP1())}
              
            >
              Increment green P1
            </button>
            </div>
            <div className={styles.row}>
          
          </div>
            
          
    </div>
    
  );
}
