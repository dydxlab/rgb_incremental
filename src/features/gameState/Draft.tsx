import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {

  incrementRed,
  incrementGreen,
  incrementBlue,
  incrementHP,
  startLoop,
  selectRed,
  selectGreen,
  selectBlue,
  selectGreenFnP1,
  selectBlueDist,
  selectBluePast,
  selectGreenDist,
  selectRedDist,
  selectLoopStarted
} from './gameStateSlice';
import styles from './Counter.module.css';

import Plot from 'react-plotly.js';
const pd = require('probability-distributions');


function getCards() {
  const cards = ['card1', 'card2', 'card3'];
  const players = ['player1', 'player2'];

  return (<React.Fragment>
    {cards.map(c => <div>text</div>)}
  </React.Fragment>
  )
}

let xA: Array<number> = [];
let yA: Array<number> = [];
for (var i = 0; i < 20000; i ++) {
	xA[i] = pd.rbeta(1, 0.5, 0.5)[0];
	yA[i] = pd.rbeta(1, 0.5, 0.5)[0];
}
/**
 <div className={styles.row}>
      <Plot
          data={[

            {
              type: 'histogram2dcontour', x:xA, y: yA
            },
          ]}
          layout={{
            width: 160, height: 120,

            margin: {
              l: 30,
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
      </div>
 */


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
  const bluePast = useAppSelector(selectBluePast);
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
      setInterval(() => dispatch(incrementHP()), 1000);
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
              type: 'scatter', y: redDist, marker: {
                color: 'red',
              }
            },
          ]}
          layout={{
            width: 160, height: 120,
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            margin: {
              l: 30,
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
              type: 'scatter', y: greenDist, marker: {
                color: 'limegreen',
              }
            },
          ]}
          layout={{
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            width: 160, height: 120, margin: {
              l: 30,
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

            {
              type: 'histogram', orientation: 'h', y: blueDist,
              xaxis: 'x2',
              yaxis: 'y2'
            },
            { type: 'scatter', y: bluePast, marker: {color: 'steelblue' }},
          ]}
          layout={{
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            width: 160, height: 120, margin: {
              l: 40,
              r: 20,
              b: 20,
              t: 20,
              pad: 4
            },
            showlegend: false,
            xaxis: {
              domain: [0, 0.7], 
              zeroline: false
            },
            yaxis: {
              zeroline: false
            },
            xaxis2: {
              domain: [0.8, 1],
              showticklabels: false
            },
            yaxis2: {
              anchor: 'x2',
              range: [0, 10],
              showticklabels: false
            }
          }}
          config={{
            'displayModeBar': false
          }}
        />
      </div>
      {!loopStarted &&
        <div>

          <button
            className={styles.button}
            aria-label="start"
            onClick={initializeLoop}
          >
            Start
        </button>
        </div>
      }
    


    </div>

  );
}
