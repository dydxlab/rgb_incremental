import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {

  incrementRed,
  incrementGreen,
  incrementBlue,
  startLoop,
  selectRed,
  selectGreen,
  selectBlue,
  selectGreenFnP1,
  selectBlueDist,
  selectGreenDist,
  selectRedDist,
  selectLoopStarted
} from './gameStateSlice';
import styles from './Counter.module.css';

import Plot from 'react-plotly.js';


function getCards() {
  const cards = ['card1', 'card2', 'card3'];
  const players = ['player1', 'player2'];

  return (<React.Fragment>
    {cards.map(c => <div>text</div>)}
  </React.Fragment>
  )
}

/*cards.map((card) => return (
      <div>card</div>
  ))*/
export const Draft: FunctionComponent = () => {
  const red = useAppSelector(selectRed);
  const redDist = useAppSelector(selectRedDist);
  const green = useAppSelector(selectGreen);
  const greenDist = useAppSelector(selectGreenDist);
  const blue = useAppSelector(selectBlue);
  const blueDist = useAppSelector(selectBlueDist);
  const loopStarted = useAppSelector(selectLoopStarted);

  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  //  onClick={() => dispatch(incrementAsync(incrementred))}

  function initializeLoop() {
    // start timer after button is clicked
    if (!loopStarted) {
      dispatch(startLoop())
      setInterval(() => dispatch(incrementRed()), 1000);
      setInterval(() => dispatch(incrementGreen()), 1000);
      setInterval(() => dispatch(incrementBlue()), 1000);
    }
  }


  return (
    <div>
      <div className={styles.row}>

        <span className={styles.value} style={{ 'color': 'red' }}>{red.toFixed(1)}</span>

        <span className={styles.value} style={{ 'color': 'limegreen' }}>{green.toFixed(1)}</span>
        <span className={styles.value} style={{ 'color': 'steelblue' }}>{blue.toFixed(1)}</span>



      </div>
      <div className={styles.row}>
        <Plot
          data={[

            {
              type: 'histogram', x: redDist, marker: {
                color: 'red',
              }
            },
          ]}
          layout={{
            width: 320, height: 240,

            margin: {
              l: 0,
              r: 20,
              b: 20,
              t: 20,
              pad: 4,

            },
          }}
          config={{
            'displayModeBar': false
          }}
        />

        <Plot
          data={[

            {
              type: 'histogram', x: greenDist, marker: {
                color: 'limegreen',
              }
            },
          ]}
          layout={{
            width: 320, height: 240, margin: {
              l: 0,
              r: 20,
              b: 20,
              t: 20,
              pad: 4
            },
          }}
          config={{
            'displayModeBar': false
          }}
        />

        <Plot
          data={[

            { type: 'histogram', x: blueDist },
          ]}
          layout={{
            width: 320, height: 240, margin: {
              l: 0,
              r: 20,
              b: 20,
              t: 20,
              pad: 4
            },
          }}
          config={{
            'displayModeBar': false
          }}
        />
      </div><div>
        <button
          className={styles.button}
          aria-label="start"
          onClick={initializeLoop}
        >
          Start
        </button>
      </div>





    </div>

  );
}
