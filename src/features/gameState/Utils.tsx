import React, { useState, FunctionComponent } from 'react';

import {
    Cost
} from './gameStateSlice';

//export function getCostString(cost: Cost) {
export const getCostString: FunctionComponent<Cost> = (cost: Cost) => {
  
    return (<span>
        {cost.green > 0 && <span>{cost.green}<span style={{ color: 'limegreen' }}>G  </span></span>}
        {cost.blue > 0 && <span>{cost.blue}<span style={{ color: 'blue' }}>B  </span></span>}
        {cost.red > 0 && <span>{cost.red}<span style={{ color: 'red' }}>R  </span></span>}
    </span>)

}