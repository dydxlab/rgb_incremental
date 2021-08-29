import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectGreenUpgradeCost,
    selectRedUpgradeCost,
    selectBlueUpgradeCost,
    upgrade
} from './gameStateSlice';
import styles from './Counter.module.css';

export const GachaPull: FunctionComponent = () => {
  /*onClick={() => dispatch(upgrade({'green': greenUpgradeCost}))}*/

    return (
        <div>
            
                <span>Price # _____ </span>
                <button
                    className={styles.button}
                    
                >
                    Pull Gacha
                </button>



        </div>

    );
}
