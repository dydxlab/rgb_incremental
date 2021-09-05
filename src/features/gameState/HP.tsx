import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectNextDoors,
    stepQuest
} from './gameStateSlice';
import styles from './Counter.module.css';

export const CYOA: FunctionComponent = () => {
    let options = useAppSelector(selectNextDoors)
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
                        onClick={() => dispatch(stepQuest({"choice": option}))}

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
