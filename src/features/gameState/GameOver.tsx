import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectNextOptions
} from './cyoaSlice';
import {
    selectHP
} from './gameStateSlice';

import styles from './Counter.module.css';

export const GameOver: FunctionComponent = () => {
    let options = useAppSelector(selectNextOptions)



    return (
        <div>
        {
            options.length > 0 && (
                <div className={styles.endScreen} style={{ 'color': 'gold' }} >
                    <span>You Win!</span>
                    </div>
                )
                
        }
        {
            options.length > 0 && (
                <div className={styles.endScreen} style={{ 'color': 'red' }} >
                    <span>GAME OVER</span>
                    </div>
                )
                
        }
        </div>
    )
}
