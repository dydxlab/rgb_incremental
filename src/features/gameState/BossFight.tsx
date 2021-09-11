import React, { useState, FunctionComponent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectRed,
    selectGreen,
    selectBlue,
    selectHP,
    selectBossHP,
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
    clearGameLoopIntervals,
    incrementBossHP,
    setGameLoopIntervals,
    attackBoss,
    bossAttack,
    selectBossStatus,
    SlimeBossStatusColors
} from './gameStateSlice';



import { Spell, RoomList } from './Types'
import { formatResourceValue } from './Utils'

import styles from './Counter.module.css';



export const BossFight: FunctionComponent = () => {
    let options = useAppSelector(selectNextDoors)
    let roomName = useAppSelector(selectRoomName)
    let messages = useAppSelector(selectCombatLogMessages)
    let spells = useAppSelector(selectSpells)
    const red = useAppSelector(selectRed);
    const green = useAppSelector(selectGreen);
    const blue = useAppSelector(selectBlue);
  
    let spell1 = useAppSelector(selectSpells)[0]
    let spell2 = useAppSelector(selectSpells)[3]
    let spell3 = useAppSelector(selectSpells)[4]
    const dispatch = useAppDispatch();
    const hp = useAppSelector(selectHP);
    const bossHp = useAppSelector(selectBossHP);
    const bossStatus = useAppSelector(selectBossStatus);


    function spellFn(spell: Spell) {
        console.log(bossStatus)
        console.log(SlimeBossStatusColors[bossStatus])
        if (spell.available) {
            dispatch(castSpell(spell))
            dispatch(attackBoss(spell))
            setTimeout(() => dispatch(resetSpell(spell)), spell.cooldown || 1000)
            setTimeout(() => dispatch(clearCombatLogMessages()), 7000)

        }

    }

    function gemAttack() {
        dispatch(castSpell({'description': 'Gem Attack'}))
        dispatch(attackBoss({'description': 'Gem Attack'}))

    }

    function initializeLoop() {
        // start timer after button is clicked
      dispatch(clearGameLoopIntervals());
          let intval = setInterval(() => {
                dispatch(bossAttack());            
            },
            5000);

          
          dispatch(setGameLoopIntervals(intval))
    }

    const BossIcon = (props) =>(
        <svg height="300px" width="300px" fill={props.fillColor}  version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g><path d="M50.9,76.6c0,2.1-0.3,3.6-0.7,4.5c-0.2,0.4-0.3,0.6-0.3,1.2c-0.2,2.5,0,8,0,8.2l2.2-0.1c0.9,0,1.7-0.8,1.7-1.7   c0.1-2.4,0.2-6.6,0-7.8c-0.1-0.4,0.1-1.8,0.2-2.4C53,77.9,51.9,77.4,50.9,76.6z"/><path d="M33.7,36.5c0.1-2.1-3.3-4.5-5.8-5.1c-1.3-0.3-2.6-0.5-4.2-0.5c-1.3,0-2.8,0.1-4.6,0.4l1.3-2.6l-3.7,3c0,0-0.1,0-0.1,0   l1.1-2.6c-0.7,0.7-2.6,2.6-3.1,3c-0.5,0.1-1.1,0.3-1.7,0.4c-2.9,0.7-2.4,1.3-4.2,2.1c-1.8,0.9-5.4,2.1-6.2,3.2s0,3,0,3l1.5,1.2   l0.5-2l1.7,1l0.5-1.7L8,40.7L8.8,39h0l1.5,0.9l0.7-1.3c0.3-0.1,0.4-0.1,0.4-0.1l0.8,2.1c0,0-0.3,0.3-0.9,0.7h-1.1l-0.2,1.1   c-0.1,0-0.1,0.1-0.2,0.1l-1.2-0.2l0,1.2c0,0-0.1,0.1-0.1,0.1l-1.2-0.3l-0.3,1.4c0,0,0,0,0,0L6,44.5l-0.1,1.3   c-0.4,0.5-0.7,1.2,0.5,1.5c0.1,0,0.1,0,0.2,0c1.4,0,4.5-2.9,6.4-3.8c1.6-0.8,4.4-5.5,9.4-5.5c1.1,0,2.4,0.2,3.8,0.8   c0,0,2.1,2,3.1,5.3c1,3.4,3.4,9.1,5.1,10.4C34.4,54.6,33.2,50.4,33.7,36.5z M12.1,36.1c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7   c0.4,0,0.7,0.3,0.7,0.7S12.5,36.1,12.1,36.1z"/><path d="M90.6,53.1c1.4-3.4,7.4-0.5,7.4-0.5c-0.5-0.7-3.4-5.5-8.5-1.8C84.4,54.5,89,57.2,89,63s-7.3,4.6-7.3,4.6l-2.2-0.9   c0,0-2.9-2.7-6.8-5.5l3.4-1.2c-1,0.2-3.9,0-5.4-0.2c-0.2-0.1-0.4-0.2-0.5-0.4l3.7-1.5c-1.5,0.3-5.1,0-6.2-0.1   c-0.1-0.1-0.2-0.1-0.3-0.2c1.3-0.4,3.3-1.6,3.3-1.6c-0.7,0.4-5.2,0.2-6.3,0.1c0,0-0.1,0-0.1-0.1c0.9-0.6,1.8-1.7,1.8-1.7   c-0.8,0.4-4.3,0.5-5.6,0.6C60,55.1,59.7,55,59.3,55l-5.7-0.1c-1.3-0.1-2.5-0.4-3.5-0.9c-1.8-0.9-2.2-3.3-0.9-4.8   c2.1-2.3,5.5-3.9,7.2-5.2c4.4-3.3,6.4-6.5,6.5-9c0.1-1.3,0-2.6-0.3-4.2c-0.2-1.1-0.5-2.4-0.9-4l1.5,0.5l-2.4-3.3   c0-0.1-0.1-0.2-0.1-0.3l2.2,0.7l-3.2-3.2c-0.1-0.2-0.2-0.5-0.3-0.7c-0.5-1.2-0.7-3.7-0.7-3.7c-0.1-2-0.4-5.8-1.1-7   c-0.7-1.1-2.8-1.1-2.8-1.1L53,9.4l1.7,1.3l-1.6,1.2l1.3,1.1l-1.5,0.8l1.3,1.4v0l-1.3,0.8l0.9,1.3l-1.1,0.8l0.1,0.1   c0.4,0.5,0.5,1.3,0.1,1.8c-0.6,0.4-1.5,0.4-2.1,0c-0.5-0.3-0.9-0.7-1.2-0.9l-0.2-1.1l-1.1,0c-0.1-0.1-0.1-0.1-0.2-0.2l0-1.2   l-1.2,0.2c0,0-0.1-0.1-0.1-0.1l0.1-1.2l-1.5,0c0,0,0,0,0,0l0-1.3l-1.3,0.1c-0.6-0.3-1.3-0.5-1.4,0.8c0,0.1,0,0.1,0,0.2   c0.3,1.4,4.6,5.3,5.8,7c1.1,1.5,5.8,3.3,6.7,8.2c0.1,0.5,0.1,1,0.1,1.5c0,1.5-0.6,3-1.7,4.1c-0.8,0.8-1.8,1.6-3.2,2.3   c-1.8,0.9-4.2,2.5-6.2,3.9c0-0.1,0-0.1,0-0.2l0,0.1C42.9,31.3,44.1,17,33,14.4c-1.5-0.3-2.9-0.6-4.7-0.6c-1.5,0-3.2,0.1-5.3,0.5   l1.6-3c-0.6,0.9-3.4,3-4.1,3.5c0,0-0.1,0-0.1,0l1.1-2.5c-0.5,1.1-2.8,2.5-3.7,3.1c-0.6,0.1-1.2,0.3-1.8,0.4   c-3.3,0.8-2.7,1.5-4.7,2.4c-2,1-6.1,2.4-7,3.6c-0.9,1.2,0,3.4,0,3.4l1.7,1.3l0.6-2.3l2,1.1l0.6-1.9l1.5,1.3l0.9-1.9l0,0l1.7,1   l0.8-1.5c0.3-0.1,0.5-0.1,0.5-0.1l0.9,2.4c0,0-0.4,0.3-1,0.8h-1.2l-0.2,1.2c-0.1,0-0.1,0.1-0.2,0.1l-1.3-0.2l0,1.3   c-0.1,0-0.1,0.1-0.1,0.1L10,27.7l-0.3,1.6c0,0,0,0,0,0l-1.4-0.3l-0.2,1.5c-0.5,0.6-0.8,1.3,0.6,1.7c0.1,0,0.1,0,0.2,0   c1.6,0,5.1-3.2,7.2-4.3c1.8-0.9,5-6.2,10.6-6.2c1.3,0,2.7,0.3,4.2,0.9c4.6,2,3.2,4.8,4.4,30.5c0,0,0,5.7,5.2,11.6   c0.4,0.5,0.8,1,1.2,1.5c0.2,1.5,0.7,3.3,1.6,5.3c0,0,0.2,5.3,0,9.4c-0.1,1.9-0.3,3.7-0.5,5.2c-0.3,0.4-1.6,2-2.4,1.9   c-0.9-0.1-2.3-0.4-3.3-0.2c-1,0.2-1.6,1.6-1.4,2.3c0,0,0.5-1.1,1.3-1.1c0,0,0.8,0.9,1.7,0.9s3.7,0.3,3.7,0.3h4.5   c0.8,0,1.4-0.6,1.4-1.4c-0.1-1.9-0.1-5.1,0-6.9c0.2-2.3,1.4-1.3,0.9-7.8c2.5,2.2,6,3.1,8.4,4.2c2.2,1,7.1,1.9,10.6,1.9   c1.1,0-0.1,0,1-0.1c0.2,0.9,0.4,2.2,0.7,2.8c0.9,2.3,1.8,4.1,1.8,4.1v2.3c0,0,0,0-0.1,0c-1,0-3,0-3.3,0c-0.5,0-1.6,0.7-1.4,1.4   l0.1,0.3c0,0,1-0.8,1.5-0.5c0.5,0.3,0.4,0.6,1.4,0.7h6.4c0,0,1.1-3.2-0.9-8.3l0.8-2.3c0.2-0.7,0.8-1.3,1.5-1.6   c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.3,1.1-0.3,1.8-0.4C97.3,76.8,94.6,67.3,94.6,65C94.6,60.4,89.3,56.5,90.6,53.1z M56.4,20.5   c0.4-0.1,0.8,0.2,0.9,0.5c0.1,0.4-0.2,0.7-0.6,0.8c-0.4,0.1-0.8-0.2-0.9-0.5C55.7,20.9,56,20.6,56.4,20.5z M15.2,19.6   c-0.4,0-0.8-0.4-0.8-0.8c0-0.5,0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8C16,19.3,15.7,19.6,15.2,19.6z"/><path d="M76.1,60c0.1,0,0.1,0,0.2-0.1L76.1,60z"/><path d="M70.7,89v-1.3c-0.3-0.6-1-2.1-1.7-4c-0.2-0.4-0.4-1.2-0.6-1.8c-0.8,0-1.5,0.2-2.2,0.2c0,0,0,0.3,0,0.3c0,0.9,0,1.8,0.1,2.6   c0.2,2.9,0.2,2.9,0.2,2.9s-0.2,0.3-0.4,0.7c-0.2,0.4-0.7,0.4-1.1,0.5c-0.2,0-0.3,0-0.4,0c-0.2-0.2-1.9-0.2-2.1,0.1   c-0.2,0.3-0.6,1.2-0.6,1.2s0.7-0.6,1.1-0.4c0.5,0.2,0.7,0.7,2,0.7c1.3,0,2.1-1.1,2.1-1.1l0.2-0.2C67.7,88.7,70.3,89.3,70.7,89z"/></g></svg>
    )
    //<img src="./boss_hydra.svg" alt="heart" className={styles.animate__bounce} />

    return (
        <div>
 
            <h2 style={{ 'color': 'rgb(255, 255, 255)' }}>Temple Guardian </h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="350" height="50">
                <g>
                <title>Layer 1</title>
                <rect id="svg_1" height="50" width={350 * (bossHp / 100) } y="0" x="0" stroke="#000" fill="#00b977"/>
                <rect id="svg_2" height="50" width={350 - (350 * (bossHp / 100))} y="0" x={350 * (bossHp / 100)} stroke="#000" fill="#af1c1f"/>
                </g>
                </svg>
            <br />
            <div className={styles.row}>
            <button
                            className={styles.button}
                            onClick={() => spellFn(spell1)}

                        >
                           {spell1.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell1.description}
                        </button>
            <div className={styles.animate__bounce}> <BossIcon fillColor={SlimeBossStatusColors[bossStatus]} /> </div>

            <button
                            className={styles.button}
                            onClick={() => spellFn(spell2)}

                        >
                            {spell2.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell2.description}
                        </button>

            </div>
            <br />
            <button
                            className={styles.button}
                            onClick={() => spellFn(spell3)}

                        >
                            {spell3.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell3.description}
                        </button>
            <br />
            <span style={{ 'color': 'red' }}>{Math.round(hp * 10) / 10}
                <img src="./hp-heart.svg" alt="heart" className={hp > 30 ? styles.hpheart : styles.hpheartFaster} />
            </span>
            <button
                            className={styles.button}
                            onClick={() => initializeLoop()}

                        >
                            Start
                        </button>
                        <br />
                        <button
                            className={styles.button}
                            onClick={() => gemAttack()}

                        >
                            Gem Attack
                        </button>
            <div className={styles.row}>

<span className={styles.value} style={{ 'color': 'red' }}>{formatResourceValue(red)}</span>

<span className={styles.value} style={{ 'color': 'limegreen' }}>{formatResourceValue(green)}</span>
<span className={styles.value} style={{ 'color': 'steelblue' }}>{formatResourceValue(blue)}</span>
</div>
        </div>
    )
}


/*
<div className={styles.slimerun}>
                <div className={styles.slimerunColor} />
            </div>
            */