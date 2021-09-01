import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectNextOptions,
    step
} from './cyoaSlice';
import styles from './Counter.module.css';

export const CYOA: FunctionComponent = () => {
    /*onClick={() => dispatch(upgrade({'green': greenUpgradeCost}))}*/
    let options = useAppSelector(selectNextOptions)
    const dispatch = useAppDispatch();


    return (
        <div>
        <h1>Quest</h1>
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
