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
        <h1>Quest - <span style={{ 'color': 'red' }}>{ Math.round(hp * 10) / 10 } </span> </h1>
        <div className={styles.row}>
            
            {options && options.map(option =>
            (
                <div>
                    <p>{option.title} </p>
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
