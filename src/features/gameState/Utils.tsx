import React, { useState, FunctionComponent } from 'react';

import {
    Cost
} from './Types';

//export function getCostString(cost: Cost) {
export const getCostString: FunctionComponent<Cost> = (cost: Cost) => {
  
    return (<span>
        {cost.green > 0 && <span>{cost.green}<span style={{ color: 'limegreen' }}>G  </span></span>}
        {cost.blue > 0 && <span>{cost.blue}<span style={{ color: 'blue' }}>B  </span></span>}
        {cost.red > 0 && <span>{cost.red}<span style={{ color: 'red' }}>R  </span></span>}
    </span>)

}

export function formatResourceValue(x: number): String {
    if(x <= 10000){
      return x.toFixed(1)
    } else if(x > 10000 && x <= 1000000){
      return (x / 1000).toFixed(0) + 'K'
    } else if(x > 1000000 && x <= 1000000000){
      return (x / (1000 * 1000)).toFixed(0) + 'M'
    } else if(x > 1000000000 && x <= 1000000000000){
      return (x / (1000 * 1000 * 1000)).toFixed(0) + 'B'
    } else {
      return x + ''
    }
  }