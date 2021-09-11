import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  incrementRed,
  incrementGreen,
  incrementBlue,
  incrementHP,
  setGameLoopIntervals,
  clearGameLoopIntervals,
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
import { formatResourceValue } from './Utils';
import styles from './Counter.module.css';

import Plot from 'react-plotly.js';
const pd = require('probability-distributions');

let xA: Array<number> = [];
let yA: Array<number> = [];
for (var i = 0; i < 20000; i++) {
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
  const gameStatus = useAppSelector(selectGameStatus);
  const audio = new Audio("./impromptu_lower_bitrate.mp3")


  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const plotlyLayout = {
    width: 160, height: 120,
    plot_bgcolor: 'rgba(255,255,255,0.0)',
    paper_bgcolor: 'rgba(255,255,255,0.3)',
    margin: {
      l: 30,
      r: 20,
      b: 20,
      t: 20,
      pad: 4,

    },
    xaxis: {
      color: 'white'
    },
    yaxis: {
      color: 'white'
    }

  }

  //  onClick={() => dispatch(incrementAsync(incrementred))}

  function initializeLoop() {
    // start timer after button is clicked
    if (gameStatus == 'ready') {
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
      audio.volume = 0.2;
      audio.play();
    }
  }


  return (
    <div>
      <div className={styles.row}>

        <span className={styles.value} style={{ 'color': 'red' }}>{formatResourceValue(red)}</span>

        <span className={styles.value} style={{ 'color': 'limegreen' }}>{formatResourceValue(green)}</span>
        <span className={styles.value} style={{ 'color': 'steelblue' }}>{formatResourceValue(blue)}</span>



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

          layout={plotlyLayout}
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
          layout={plotlyLayout}
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
            { type: 'scatter', y: bluePast, marker: { color: 'steelblue' } },
          ]}
          layout={{
            plot_bgcolor: 'rgba(255,255,255,0.0)',
            paper_bgcolor: 'rgba(255,255,255,0.3)',
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
              color: 'white',
              zeroline: false
            },
            yaxis: {
              color: 'white',
              zeroline: false
            },
            xaxis2: {
              color: 'white',
              domain: [0.8, 1],
              showticklabels: false
            },
            yaxis2: {
              color: 'white',
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
      {gameStatus == 'ready' &&
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
