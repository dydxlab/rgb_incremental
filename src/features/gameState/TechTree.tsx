import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectUpgradeCost,
    upgrade
} from './techTreeSlice';
import styles from './Counter.module.css';

export const TechTree: FunctionComponent = () => {
    const upgradeCost = useAppSelector(selectUpgradeCost);

    const dispatch = useAppDispatch();

    return (
        <div>
            <div className={styles.row}>

                <button
                    className={styles.button}
                    onClick={() => dispatch(upgrade())}
                >
                    Upgrade - {upgradeCost}
                </button>
            </div>



        </div>

    );
}
