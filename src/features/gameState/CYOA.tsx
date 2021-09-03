import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectNextOptions,
    step
} from './cyoaSlice';
import {
    selectHP
} from './gameStateSlice';

import styles from './Counter.module.css';

export const CYOA: FunctionComponent = () => {
    let options = useAppSelector(selectNextOptions)
    const dispatch = useAppDispatch();
    const hp = useAppSelector(selectHP);


    return (
        <div>
        <h1 style={{ 'color': 'rgb(255, 255, 255)'}}>Quest - <span style={{ 'color': 'red' }}>{ Math.round(hp * 10) / 10 }         
        <img src="/hp-heart.svg" alt="heart" className={styles.hpheart} />
</span> </h1>
        <div className={styles.row}>
            
            {options && options.map(option =>
            (
                <div>
                    <h3 style={{ 'color': 'rgb(255, 255, 255)'}}>{option.title} </h3>
                    <button
                        className={styles.button}
                        onClick={() => dispatch(step({"choice": option}))}

                    >
                        {option.action}
                    </button>
                </div>
            )

            )
            }
        </div>
        </div>
    )
}
