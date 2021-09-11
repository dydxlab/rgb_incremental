import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectGreenUpgradeCost,
    selectRedUpgradeCost,
    selectBlueUpgradeCost,
    selectItemCost,
    upgrade,
    buyItem,
} from './gameStateSlice';
import {GSResourceName} from './Types'
import {getCostString} from './Utils'
import styles from './Counter.module.css';



export const TechTree: FunctionComponent = () => {
    const greenUpgradeCost = useAppSelector(selectGreenUpgradeCost);
    const redUpgradeCost = useAppSelector(selectRedUpgradeCost);
    const blueUpgradeCost = useAppSelector(selectBlueUpgradeCost);
    const itemCost = useAppSelector(selectItemCost);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className={styles.row}>
                {redUpgradeCost &&
                    <button
                        className={styles.button}
                        onClick={() => dispatch(upgrade({ 'red': redUpgradeCost }))}
                    >
                        Red Upgrade - {getCostString(redUpgradeCost?.[0])}
                    </button>
                }
                {greenUpgradeCost &&
                    <button
                        className={styles.button}
                        onClick={() => dispatch(upgrade({ 'green': greenUpgradeCost }))}
                    >
                        Green Upgrade - {getCostString(greenUpgradeCost?.[0])}


                    </button>
                }
                {blueUpgradeCost &&
                    <button
                        className={styles.button}
                        onClick={() => dispatch(upgrade({ 'blue': blueUpgradeCost }))}
                    >
                        Blue Upgrade - {getCostString(blueUpgradeCost?.[0])}
                    </button>
                }
            </div>
        </div>

    );
}

/*
 <div className={styles.row}>
                {itemCost &&
                    <button
                        className={styles.button}
                        onClick={() => dispatch(buyItem({ 'item': itemCost }))}
                    >
                        Item - {getCostString(itemCost[0])}
                    </button>
                }
            </div>
 */
