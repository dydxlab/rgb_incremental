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
    selectCombatLogMessages,
    selectRoomName,
    resetState, 
    boulderKill,
    addCombatLogMessages,
    startBossFight
} from './gameStateSlice';
import { Spell, RoomList } from './Types'
import { getCostString } from './Utils'

import styles from './Counter.module.css';



export const CYOA: FunctionComponent = () => {
    let options = useAppSelector(selectNextDoors)
    let roomName = useAppSelector(selectRoomName)
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

    function goStepQuest(choice){
        dispatch(stepQuest(choice))
        if(choice.choice.title === RoomList.Boulder){
            dispatch(addCombatLogMessages('An enormous boulder cascades toward you.'))

            setTimeout(() => dispatch(boulderKill()), 10000)
        } else if(choice.choice.title === RoomList.TempleGuardian){
            dispatch(startBossFight());
        }
    }


    return (
        <div>
 
            <h2 style={{ 'color': 'rgb(255, 255, 255)' }}>Quest - <span style={{ 'color': 'red' }}>{Math.round(hp * 10) / 10}
                <img src="./hp-heart.svg" alt="heart" className={hp > 30 ? styles.hpheart : styles.hpheartFaster} />
            </span> </h2>
            <div className={styles.row}>
            <span style={{ 'color': 'lightgrey', 'fontSize':'12px' }}>Current Room: {roomName}</span>
            <button
                className={styles.button}
                onClick={() => dispatch(resetState())}

            >Reset</button>
            </div>
            { true && (
                <div className={styles.row}>
                    <span style={{ 'color': 'lightgrey', 'fontFamily': 'monospace' }}>
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
                            onClick={() => goStepQuest({ "choice": option })}

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
                            {spell.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell.description}
                        </button>

                    )
                    )
                }
            </div>
        </div>
    )
}
