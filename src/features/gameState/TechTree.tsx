import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectGreenUpgradeCost,
    selectRedUpgradeCost,
    selectBlueUpgradeCost,
    upgrade
} from './gameStateSlice';
import styles from './Counter.module.css';

export const TechTree: FunctionComponent = () => {
    const greenUpgradeCost = useAppSelector(selectGreenUpgradeCost);
    const redUpgradeCost = useAppSelector(selectRedUpgradeCost);
    const blueUpgradeCost = useAppSelector(selectBlueUpgradeCost);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className={styles.row}>

                <button
                    className={styles.button}
                    onClick={() => dispatch(upgrade({'green': greenUpgradeCost}))}
                >
                    Green Upgrade - {JSON.stringify(greenUpgradeCost?.[0])}
                </button>
            </div>

            <div className={styles.row}>

                <button
                    className={styles.button}
                    onClick={() => dispatch(upgrade({'red': redUpgradeCost}))}
                >
                    Red Upgrade - {JSON.stringify(redUpgradeCost?.[0])}
                </button>
            </div>

            <div className={styles.row}>

                <button
                    className={styles.button}
                    onClick={() => dispatch(upgrade({'blue': blueUpgradeCost}))}
                >
                    Blue Upgrade - {JSON.stringify(blueUpgradeCost?.[0])}
                </button>
            </div>



        </div>

    );
}
