import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectHP,
    selectNextDoors,
    stepQuest,
    selectSpells,
    castSpell,
    resetSpell,
    clearCombatLogMessages,
    selectCombatLogMessages
} from './gameStateSlice';
import { Spell } from './Types'
import { getCostString } from './Utils'


import styles from './Counter.module.css';



export const CYOA: FunctionComponent = () => {
    let options = useAppSelector(selectNextDoors)
    let messages = useAppSelector(selectCombatLogMessages)
    let spells = useAppSelector(selectSpells)
    const dispatch = useAppDispatch();
    const hp = useAppSelector(selectHP);

    function spellFn(spell: Spell) {
        if (spell.available) {
            dispatch(castSpell(spell))
            setTimeout(() => dispatch(resetSpell(spell)), spell.cooldown || 1000)
            setTimeout(() => dispatch(clearCombatLogMessages()), 7000)

        }

    }


    return (
        <div>
            <h2 style={{ 'color': 'rgb(255, 255, 255)' }}>Quest - <span style={{ 'color': 'red' }}>{Math.round(hp * 10) / 10}
                <img src="./hp-heart.svg" alt="heart" className={hp > 30 ? styles.hpheart : styles.hpheartFaster} />
            </span> </h2>
            { true && (
                <div className={styles.row}>
                    <span style={{'color':'lightgrey', 'fontFamily':'monospace'}}>
                        {messages.join('. ')}
                    </span>
                </div>
            )

            }
            <div className={styles.row}>

                {options && options.map(option =>
                (
                    <div>
                        <h3 style={{ 'color': 'rgb(255, 255, 255)' }}>{option.title} </h3>
                        <button
                            className={styles.button}
                            onClick={() => dispatch(stepQuest({ "choice": option }))}

                        >
                            {option.action} - {getCostString(option.cost)}
                        </button>
                    </div>
                )

                )
                }

            </div>
            <div className={styles.row}>
            {spells && 
            
            spells.map(spell => (
            
                <button
                    className={styles.button}
                    onClick={() => spellFn(spell)}

                >
                    {spell.available ? 'Y - ' : 'N - '} {spell.description}
                </button>
           
            )
            )
            }
            </div>
        </div>
    )
}
