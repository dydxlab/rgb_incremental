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
    SlimeBossStatusColors,
    selectGameLoopInterval
} from './gameStateSlice';



import { Spell, RoomList, SpellList } from './Types'
import { formatResourceValue } from './Utils'

import styles from './Counter.module.css';



export const BossFight: FunctionComponent = () => {
    let options = useAppSelector(selectNextDoors)
    let roomName = useAppSelector(selectRoomName)
    let messages = useAppSelector(selectCombatLogMessages)
    let spells = useAppSelector(selectSpells)
    let bossFightStarted = false;
    const red = useAppSelector(selectRed);
    const green = useAppSelector(selectGreen);
    const blue = useAppSelector(selectBlue);
    const gameLoopInterval = useAppSelector(selectGameLoopInterval)

    let spell1 = useAppSelector(selectSpells).find(x => x.description === SpellList.Fireball)
    let spell2 = useAppSelector(selectSpells).find(x => x.description === SpellList.FrostRay)
    let spell3 = useAppSelector(selectSpells).find(x => x.description === SpellList.SpectralRope)
    const dispatch = useAppDispatch();
    const hp = useAppSelector(selectHP);
    const bossHp = useAppSelector(selectBossHP);
    const bossStatus = useAppSelector(selectBossStatus);


    function spellFn(spell?: Spell) {
        if (spell && spell.available) {
            dispatch(castSpell(spell))
            dispatch(attackBoss(spell))
            setTimeout(() => dispatch(resetSpell(spell)), spell.cooldown || 1000)
            setTimeout(() => dispatch(clearCombatLogMessages()), 7000)

        }

    }

    function gemAttack() {
        dispatch(castSpell({ 'description': 'Gem Attack' }))
        dispatch(attackBoss({ 'description': 'Gem Attack' }))

    }

    function initializeLoop() {
        // start timer after button is clicked
        bossFightStarted = true;
        dispatch(clearGameLoopIntervals());
        let intval = setInterval(() => {
            dispatch(bossAttack());
        },
            5000);


        dispatch(setGameLoopIntervals(intval))
    }

    const BossIcon = (props) => (
        <svg height="300px" width="300px" fill={props.fillColor} version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g xmlns="http://www.w3.org/2000/svg"><path fill="#ffe900" d="M9.6,50.3c0,0-1.9-0.9-2.8-1.5s-2.4-1.3-2.4-1.3s-1.9,1.3-2.3,2.9c-0.4,1.6,1.2,4.2,1.2,4.2s0,0,0.3-1.3   c0.3-1.3,0.9-1.7,3.2-2C9.1,50.9,9.6,50.3,9.6,50.3z" /><path d="M61.5,43.9c-1.1,0.6-2.3,1.7,1.3,2.1c0.6,0.1,1.2-0.2,1.4-0.8c0.2-0.5,0-0.9-0.4-1.2C63.2,43.5,62.3,43.5,61.5,43.9z" /><path d="M54.2,50.1c-0.7,0.4-1.4,1,0.8,1.3c0.4,0,0.8-0.1,0.9-0.5c0.1-0.3,0-0.6-0.2-0.7C55.2,49.9,54.6,49.9,54.2,50.1z" /><path d="M66.6,58.2c-0.7,0.4-1.4,1,0.8,1.3c0.4,0,0.8-0.1,0.9-0.5c0.1-0.3,0-0.6-0.2-0.7C67.7,57.9,67.1,57.9,66.6,58.2z" /><path d="M10.2,42.1c1.8-0.1,3.1-1.2,5.7-1.6l2.3-0.2l-0.4,0.4c0,0,3.8-0.3,5.9-0.3l1.6,0.2l-0.6,0.8c0,0,3.4-1.7,5.4-3.4   c2-1.6,2-2.1,0.1-1.7c-1.9,0.4,2.3-1.7,3.2-2.9c0.8-1.1-2.8,0.3-5.2,0.7c-2.4,0.4,6.8-4.7,6.8-5.8c0-1.1-6.9,2.3-8.3,2.3   c-1.3,0,5.9-3.3,6.8-5s-4.8,2.8-7.5,2.7c-2.8-0.1,8-6.4,11.1-7.3c3.2-0.9,4.7-2.4,4.7-2.4s-4,1.7-5.4,1.7c-1.4,0-9.6,4.1-11.7,6   c0,0,4.4-4.2,6.1-5c1.7-0.8,6.1-5,6.1-5s-4,2.2-4.7,2.2c-0.7,0-8.3,4.9-8.9,5.7c-0.6,0.8,1.1-5.2,3.1-6.9c1.9-1.7,3.2-4.6,3.2-4.6   s-7.1,7-8.3,8.8c0,0,1.2-4.2,2.5-5.6c1.3-1.4,2-3.9,2-3.9s-4.3,3.4-5.2,4.6c-0.9,1.2-7.2,1.3-8.1,1.9c-0.8,0.6-2.9,1.2-2,4.6   c0.8,3.4,3.9,5.4,1.9,10.2L10.2,42.1z" /><path d="M42.3,83.9c0,0,0.4-0.4,0-1.7c-0.1-0.4-0.3-0.7-0.6-1c-1.4-1.8-1.9-2.8-1.9-2.8H37c0,0,0.1,1.6-0.1,2.4   c-0.3,0.8-2.4,1.8-2.2,3.4c0.3,1.6,1.1,2.3,2,2.3c1,0,1-0.7,1-0.7s-1.4-0.3-1.4-1.1c0,0,1.4-1.4,1.4-2c0,0,0.1,3.8,1,4.5   c0.8,0.7,1.8,0.7,1.8,0.7l0-0.1c-0.3-0.7-1-1.4-0.8-2.2c0.1-0.5,0.8-1.4,0.7-2.6c0,0,1,2.9,2,2.4c1.1-0.4,1.9-1,1.9-1.9   C44.2,83.6,43,84.7,42.3,83.9z" /><path d="M29.6,83.6c0,0,0.3-0.3,0-1.4c-0.1-0.3-0.3-0.6-0.5-0.9c-1.2-1.5-1.6-2.4-1.6-2.4H25c0,0,0.1,1.4-0.1,2.1   c-0.2,0.7-2.1,1.5-1.9,2.9c0.2,1.4,0.9,2,1.7,2s0.8-0.6,0.8-0.6s-1.2-0.2-1.2-0.9c0,0,1.2-1.2,1.2-1.7c0,0,0.1,3.3,0.8,3.8   c0.7,0.6,1.5,0.6,1.5,0.6l0-0.1c-0.3-0.6-0.8-1.2-0.7-1.9c0.1-0.4,0.7-1.2,0.6-2.2c0,0,0.8,2.4,1.7,2.1c0.9-0.3,1.6-0.8,1.6-1.6   C31.2,83.4,30.1,84.3,29.6,83.6z" /><path d="M85,83.2c-6.5,0.5-14.3-3.5-14.3-3.5s11,2.2,16.8-0.5c5.7-2.7,10.6-6.5,10.6-6.5l-8.4,1.6c0,0,6.4-6,7.6-6.8   c1.8-1.2-6,1.4-6,1.4c0.8-1.9,6.3-6.3,6.3-6.3s-4.9,0.8-8.7,4.9c-3.8,4.1-4.1,4.6-10.3,5.7c-6.3,1.1-9.4-2.4-9.4-2.4s2.2,0.9,7-0.9   c11.5-4.4,9.8-7,9.8-7c-6.6,5-10.7,2-13.7,1.7c-2.9-0.3-8.2,0.8-8.2,0.8c-4.7,0.9-10.9,0.2-13.8-0.3c3.5,0.3,9.3-0.6,12.7-2   c3.8-1.6,10.1-1.2,10.1-1.2s-3.9-1.6-10.1-0.3c-6.1,1.4-8.7,1.4-13.2,1.1c-0.6,0-1.3-0.1-2-0.3c2.3-0.7,4.7-1.7,5.4-2   c1.2-0.7,5.4-0.6,5.4-0.6s-5.9-1.4-8-0.4c-1.9,0.9-6.3,1.3-7.2,1.4c-0.3-0.1-0.6-0.3-0.9-0.4c1.6-0.4,3.3-1.2,3.9-1.6   c0.9-0.5,4.9-1.8,4.9-1.8s-4.7,0.3-7.5,1.3c-1.5,0.6-3.1,0.5-4.3,0.4c-0.2-0.1-0.4-0.2-0.6-0.4c0.3,0,0.7,0,1.1,0.1   c1.9,0.2,6.1-2.4,6.1-2.4c-2.6,0.9-5.7,1.1-6.7,0.5c-0.8-0.5-3.4-1.1-4.7-1.4c0.4,0,0.8-0.2,1.3-0.5l-0.2,0.2c0,0,10-1.8,11.8-3.5   c1.2-1.1-1.7-0.9-3.9-0.7c1.3-0.4,3.5-1.1,7.2-2.6c8.4-3.5-7.1,0.8-7.1,0.8s6.5-2.2,12.4-5.7c4.3-2.5-4.9,0.7-10.4,2.7   c0.1-0.1,0.2-0.2,0.3-0.3c4.6-1.9,11.7-5,13.6-6.5c2-1.6-4-0.3-7.7,0.6c0.1-0.1,0.3-0.3,0.4-0.4c3.4-1.2,8.7-3.3,10-4.6   c1.6-1.6-3.8-0.2-6.1,0.5c1.7-1.8,3.4-3.3,4.5-3.8c2.7-1.2,10.8-7.5,10.4-8.4c-0.3-0.6-2.6,0.8-3.8,1.6c2.3-1.9,4.7-7.1,3-5   c-1.8,2.2-6.3,3.3-6.3,3.3c3.5-2.2,5.7-10.4,4.1-8c-0.3,0.4-0.6,0.8-0.9,1.2c-2.1,2.5-4.8,4.3-7.9,5.3c-9.5,3.1-11.7,5.4-11.7,5.4   c1.6-3.7,9.6-6.1,9.6-6.1c-1,0-10.8,2.2-13,5.7c-2.2,3.5-13,12.6-14.7,13.9c-0.3,0.2-0.6,0.4-0.9,0.7c-1.4,1-3.1,1.5-4.8,1.6   c-3.3,0.2-6.3,1.5-6.3,1.5c2-2.1,5.5-2.4,5.5-2.4s-1.1-0.4-3.4,0c-2.2,0.4-5.8,1.5-5.8,1.5l2.1-1.5c-1.2,0-4.3,1.4-4.3,1.4   c-1.5,0.3-2.7,0.8-3.3,1.1c-1.7,1-3.1,2.8-3.1,2.8c2.4,1.3,6,3.1,6.2,3.8c0.3,0.7-5.4,1.7-5.4,1.7c1.6,0.4,4.3,1.2,6.2,1.8   c1.5,0.5,2.7,1.6,3.3,3c0.8,2,1.5,4.6,1.3,5.7c-0.2,1.6,2.3,9.3,3.4,11.4c1,1.9,2.4,3.2,3.7,3.5c0.4,0.2,1,0.4,2.2,0.3   c2-0.2,6.2,0.3,5.5-0.4c-0.6-0.6-3-0.3-4.6-1.3c0-0.1,0.1-0.1,0.1-0.2c0.6,0.2,1.5,0.3,2.4,0.1c1.5-0.4-0.4-0.2-2.2-1.1   c0-0.1,0-0.2,0-0.3c0.5-0.1,1.2-0.2,1.6-0.6c0.4-0.4-0.6-0.6-1.7-1c0-0.3-0.1-0.5-0.1-0.8c0.5,0.1,0.9,0.1,1.1-0.1   c0.3-0.3-0.7-1.2-1.7-2.1c-0.4-1.2-0.7-2.1-0.7-2.1l3.5-0.6c3.9,2.4,3.8,10.3,7.6,9.9c0.8,0.1,2,0.2,3.1,0.1c2-0.2,6.2,0.3,5.5-0.4   c-0.7-0.7-3.7-0.2-5.2-1.7c0,0,1.4,0.7,3.1,0.3c1.6-0.4-0.8-0.1-2.7-1.4c0,0,1.5,0,2.1-0.6c0.5-0.5-1.6-0.7-2.8-1.7   c0-0.1,0-0.3,0-0.4c0.7,0.2,1.7,0.4,2.1,0.1c0.3-0.3-0.9-1.4-2-2.4c0-0.4,0-0.7,0-1.1c3.9,4.6,8.7,7.9,10.8,9.3   c0.8,0.5,1.6,1.1,2.3,1.6c8.2,6.2,14.6,6,14.6,6c-3.5-0.8-6.5-5.7-6.5-5.7c6.5,5.7,16.8,6.8,20.3,6.8c2.8,0,10.9-3.5,10.9-3.5   S91.5,82.7,85,83.2z M10.8,47.8c-0.5,0-0.9-0.4-0.9-0.9c0,0,0,0,0,0c-0.9,0.1-1.8,0.3-1.8,0.3c1.4-1.1,2.6-1.1,2.6-1.1   c0.5,0,0.9,0.4,0.9,0.9C11.6,47.5,11.3,47.8,10.8,47.8z" /></g></svg>
    )
    //<img src="./boss_hydra.svg" alt="heart" className={styles.animate__bounce} />

    return (
        <div>

            <h2 style={{ 'color': 'rgb(255, 255, 255)' }}>Temple Guardian </h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="350" height="50">
                <g>
                    <rect id="svg_1" height="50" width={350 * (bossHp / 100)} y="0" x="0" stroke="#000" fill="#00b977" />
                    <rect id="svg_2" height="50" width={350 - (350 * (bossHp / 100))} y="0" x={350 * (bossHp / 100)} stroke="#000" fill="#af1c1f" />
                </g>
            </svg>
            <br />
            <div className={styles.row}>
                {spell1 &&
                    <button
                        className={styles.button}
                        onClick={() => spellFn(spell1)}

                    >
                        {spell1.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell1.description}
                    </button>
                }
                <div className={styles.animate__bounce}>{bossStatus === 'attacking' && <div></div>} <BossIcon fillColor={SlimeBossStatusColors[bossStatus]} /> </div>
                {spell2 &&
                    <button
                        className={styles.button}
                        onClick={() => spellFn(spell2)}

                    >
                        {spell2.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell2.description}
                    </button>
                }
            </div>
            <br />
            {spell3 &&
                <button
                    className={styles.button}
                    onClick={() => spellFn(spell3)}

                >
                    {spell3.available ? <img src="./active_spell.svg" alt="active" className={styles.spellstatus} /> : <img src="./inactive_spell.svg" alt="inactive" className={styles.spellstatus} />} {spell3.description}
                </button>
            }
            <br />
            <button
                className={styles.button}
                onClick={() => gemAttack()}

            >
                <img src="./active_spell.svg" alt="active" className={styles.spellstatus} />  Gem Attack
                        </button>
            <br />
            <span style={{ 'color': 'red' }}>{Math.round(hp * 10) / 10}
                <img src="./hp-heart.svg" alt="heart" className={hp > 30 ? styles.hpheart : styles.hpheartFaster} />
            </span>
            {isNaN(gameLoopInterval) && 
            <button
                className={styles.button}
                onClick={() => initializeLoop()}
                style={{'backgroundColor': 'goldenrod'}}

            >
                Start Fight
                        </button>
            }
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