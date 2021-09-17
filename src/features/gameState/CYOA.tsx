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
import { Spell, RoomList, SpellList } from './Types'
import { getCostString } from './Utils'
import { match, __, not, select, when } from 'ts-pattern';


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
            //setTimeout(() => dispatch(clearCombatLogMessages()), 7000)

        }

    }

    function goStepQuest(choice) {
        dispatch(stepQuest(choice))
        if (choice.choice.title === RoomList.Boulder) {
            dispatch(addCombatLogMessages('An enormous boulder cascades toward you.'))

            setTimeout(() => dispatch(boulderKill()), 10000)
        } else if (choice.choice.title === RoomList.TempleGuardian) {
            dispatch(startBossFight());
        }
    }

    function spellIcon(spellName: SpellList) {
        return match(spellName)
            .with(SpellList.CommuneWithPlants, () => <img src="./Element_F_Nature2.png" alt={spellName} title={spellName} className={styles.spellstatus} />)
            .with(SpellList.Fireball, () => <img src="./Element_A_Fire2.png" alt={spellName} title={spellName} className={styles.spellstatus} />)
            .with(SpellList.FrostRay, () => <img src="./Element_B_Lightning2.png" alt={spellName} title={spellName} className={styles.spellstatus} />)
            .otherwise(() => <img src="./fireball.svg" alt={spellName} title={spellName} className={styles.spellstatus} />)
    }


    return (
        <div>

            <h2 style={{ 'color': 'rgb(255, 255, 255)' }}>Quest - <span style={{ 'color': 'red' }}>{Math.round(hp * 10) / 10}
                <img src="./hp-heart.svg" alt="heart" className={hp > 30 ? styles.hpheart : styles.hpheartFaster} />
            </span> </h2>
            <div className={styles.row}>
                <span style={{ 'color': 'lightgrey', 'fontSize': '12px' }}>Current Room: {roomName}</span>
                <button
                    className={styles.button}
                    onClick={() => dispatch(resetState())}

                >Reset</button>
            </div>
            <div className={styles.row} >
            <div className={styles.sblock} style={{ 'color': 'lightgrey', 'fontFamily': 'monospace', 'textAlign': 'left', 'overflow': 'auto', 'height':'70px', 'width':'40em', 'fontSize': '14px' }}>
            {messages && messages.map(message => (
                <span>{message}</span>
            )
            )}
                </div>
            </div>
            <div className={styles.row}>

                {options && options.map(option =>
                (
                    <div style={{ 'backgroundColor': 'rgba(255,255,255,0.1)', border: '0.3rem groove rgba(200,200,200 ,0.2)', borderRadius: '0.5rem', margin: '0.3rem' }}>
                        <img src="./dessert.svg" alt="heart" className={styles.destinationImage} />

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
                            {spell.available ? spellIcon(spell.description) : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} 
                        </button>

                    )
                    )
                }
            </div>
        </div>
    )
}
