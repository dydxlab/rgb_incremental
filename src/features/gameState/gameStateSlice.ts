import { types } from '@babel/core';
import { createAsyncThunk, createSlice, PayloadAction, current, Draft } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {
  Spell,
  Cost,
  GreenFnParams,
  BlueFnParams,
  RedFnParams,
  redFn,
  blueFn,
  greenFn,
  hpFn,
  Room,
  GSResourceName,
  HPFnParams,
  GameStatus,
  combineRedParams,
  combineBlueParams,
  combineGreenParams,
  addResources,
  removeResources,
  isCostSatisfiable,
  spells1,
  RoomList, 
  SpellList
} from './Types'
import { initializeTier1, Item, } from './Items'
import { caveRoom, getRoomInteractions, getDoorInteractions } from './Quest'



let GreenUpgrade: [Cost, boolean, GreenFnParams, Spell[]]
let BlueUpgrade: [Cost, boolean, BlueFnParams, Spell[]]
let RedUpgrade: [Cost, boolean, RedFnParams, Spell[]]


export type SlimeBossStatus = "burnable" | "burnt" | "freezable" | "frozen" | "normal" | "attacking" | "inactive";
const SlimeBossStatuses: Array<SlimeBossStatus> = ["burnable" , "freezable" ,  "normal" ,  "normal" , "attacking" , "inactive", "inactive"]
export const SlimeBossStatusColors = {
  "burnable": "#ff0000",
  "burnt": "#860f11",
  "freezable": "#00e4ff", 
  "frozen": "#00a6b9",
  "normal": "#d2d2d2",
  "attacking": "#000000",
  "inactive": "#f3b179",
}




export interface SlimeBoss {
  bossHp: number;
  status: SlimeBossStatus;
}



export interface GameState {
  resources: Record<GSResourceName, number>;
  boss: SlimeBoss;

  gameLoopInterval: number;
  availableSpells: Array<Spell>;
  room: Room;
  items: Array<typeof Item>;
  redFnParams: RedFnParams;
  greenFnParams: GreenFnParams;
  blueFnParams: BlueFnParams;
  hpFnParams: HPFnParams;
  status: GameStatus;
  combatLogMessages: Array<String>;
  greenUpgrades: Array<typeof GreenUpgrade>;
  redUpgrades: Array<typeof RedUpgrade>;
  blueUpgrades: Array<typeof BlueUpgrade>;
  blueDist: Array<number>;
  bluePast: Array<number>;
  greenDist: Array<number>;
  redDist: Array<number>;
}

const initialState: GameState = {
  resources: {
    red: 0, // 0
    green: 0, // 20
    blue: 3, //3
    hp: 100
  },
  boss: {
    bossHp: 100,
    status: 'normal'
  },
  room: caveRoom,
  gameLoopInterval: 0,
  availableSpells: [],//Object.values(spells1),
  items: initializeTier1(),
  redFnParams: { linearP1: 1 },
  greenFnParams: { linearP1: 2, quadraticP1: 0, twoPowerP1: 0 },
  blueFnParams: { normalP1: 0, normalP2: 0 },
  hpFnParams: { linearP1: 0.1 },
  blueDist: [0, 0, 0, 0],
  bluePast: [...Array(40).keys()].map(i => 0),
  greenDist: [...Array(40).keys()].map(i => 0),
  redDist: [...Array(40).keys()].map(i => 0),
  status: "ready",
  combatLogMessages: [],
  greenUpgrades: [
    [{ green: 13, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 0, twoPowerP1: 0 }, []],
    [{ green: 29, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 0, twoPowerP1: 0 }, [spells1.CommuneWithPlants]],
    [{ green: 105, red: 0, blue: 0, hp: 0 }, false, { linearP1: 4, quadraticP1: 0, twoPowerP1: 0 }, []],
    [{ green: 82, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 0 }, [spells1.SpectralRope]],
    [{ green: 379, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0, quadraticP1: 3, twoPowerP1: 0 }, []],
    [{ green: 1800, red: 0, blue: 7, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 10 }, []],
    [{ green: 500000, red: 100, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 2 }, [spells1.Heal]],
    [{ green: 1000000000, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 10 }, []],

  ],
  redUpgrades: [
    [{ green: 13, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3 }, [spells1.Fireball]],
    [{ green: 37, red: 0, blue: 1, hp: 0 }, false, { linearP1: 0.3 }, []],
    [{ green: 105, red: 0, blue: 3, hp: 0 }, false, { linearP1: 4 }, []],
    [{ green: 10, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3 }, []],
    [{ green: 7000, red: 0, blue: 0, hp: 0 }, false, { linearP1: 8 }, []],
    [{ green: 61589, red: 0, blue: 55, hp: 0 }, false, { linearP1: 22 }, []],

  ],
  blueUpgrades: [
    [{ green: 9, red: 45, blue: 0, hp: 0 }, false, { normalP1: 0.0002, normalP2: 0.0001 }, []],
    [{ green: 499, red: 0, blue: 2, hp: 0 }, false, { normalP1: 0, normalP2: 0.5 }, [spells1.FrostRay]],
    [{ green: 0, red: 389, blue: 21, hp: 0 }, false, { normalP1: 2, normalP2: 0 }, []],
    [{ green: 0, red: 0, blue: 131, hp: 0 }, false, { normalP1: 0, normalP2: 10 }, []],
    [{ green: 0, red: 0, blue: 305, hp: 0 }, false, { normalP1: 1, normalP2: 10 }, []],
  ]


};


const initialStateCopy = Object.assign({}, initialState)

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startLoop: (state) => {
      state.status = 'started';
    },
    resetState: (state) => {
      clearInterval(state.gameLoopInterval);
      Object.assign(state, initialStateCopy);
    },
    incrementRed: (state) => {
      state.resources.red += redFn(state.redFnParams);
      state.redDist.push(redFn(state.redFnParams));
      state.redDist.shift();
    },
    castSpell: (state, payload) => {
      if (payload) {
        let spell = state.availableSpells.find(x => x.description === payload.payload.description)
        if (spell) {
          spell.available = false
          handleSpell(state, spell)
        }
      }
    },
    resetSpell: (state, payload) => {
      if (payload) {
        let spell = state.availableSpells.find(x => x.description === payload.payload.description)
        if (spell) {
          spell.available = true
        }
      }
    },
    incrementBlue: (state) => {
      state.resources.blue += blueFn(state.blueFnParams);
      state.blueDist = [...Array(1000).keys()].map(i => Math.round(blueFn(state.blueFnParams)))
      state.bluePast.push(state.resources.blue);
      state.bluePast.shift();
    },
    incrementGreen: (state) => {
      state.resources.green += greenFn(state.greenFnParams);
      state.greenDist.push(state.resources.green);
      state.greenDist.shift();
    },
    incrementHP: (state) => {
      state.resources.hp -= hpFn(state.hpFnParams);
      if (state.resources.hp <= 0) {
        state.status = "gameOver"
      }
    },

    attackBoss: (state, action) => {
      if(action.payload.description === SpellList.Fireball && state.boss.status === 'burnable'){
        state.boss.status = 'burnt'
        state.boss.bossHp -= 30
      } else if(action.payload.description === SpellList.Fireball && state.boss.status === 'normal'){
        state.boss.bossHp -= 20
      } else if(action.payload.description === SpellList.FrostRay && state.boss.status === 'freezable'){
        state.boss.status = 'frozen'
        state.boss.bossHp -= 30
      } else if(action.payload.description === SpellList.FrostRay && state.boss.status === 'normal'){
        state.boss.bossHp -= 20
      } else if(action.payload.description === 'Gem Attack' && state.boss.status === 'normal'){
        state.boss.status = 'inactive'
        state.boss.bossHp -= 10
      } else if(action.payload.description === 'Gem Attack' && state.availableSpells.find(x => x.description === SpellList.SpectralRope && !x.available) && state.boss.status === 'normal'){
        state.boss.status = 'inactive'
        state.boss.bossHp -= 15
      }
      if (state.boss.bossHp <=0){
        state.status = 'victory'
      }
    },
    startBossFight: (state) => {
      state.status = 'bossFight'
      clearInterval(state.gameLoopInterval)
      state.gameLoopInterval = NaN
    },
    bossAttack: (state) => {
      if(state.availableSpells.find(x => x.description === SpellList.SpectralRope && !x.available) || state.boss.status === 'frozen' || state.boss.status === 'burnt'){
        state.resources.hp -= 3
      } else {
        state.resources.hp -= 5
      }
      state.boss.status = SlimeBossStatuses[Math.round(Math.random() * SlimeBossStatuses.length)]
      if(state.resources.hp <= 0) {
        state.status = 'gameOver'
      }

    },
    incrementBossHP: (state) => {
      state.boss.bossHp -= (4 * Math.random())
      if (state.boss.bossHp <= 0) {
        state.status = "victory"
        console.log(state.status)
      }
      console.log(state.status)
    },
    boulderKill: (state) => {
      if(state.room.name === RoomList.Boulder){
        state.status = "gameOver"
      }
    },

    setGameLoopIntervals: (state, action) => {
      state.gameLoopInterval = action.payload
    },
    clearGameLoopIntervals: (state) => {
      clearInterval(state.gameLoopInterval);
      state.gameLoopInterval = 0;
    },
    addCombatLogMessages: (state, action) => {
      state.combatLogMessages.push(action.payload)
    },
    clearCombatLogMessages: (state) => {
      state.combatLogMessages = []
    },
    buyItem: (state, action) => {
      if (action.payload.item) {
        let item = state.items[0]
        let currentItem = current(item)
        if (!item || !currentItem || action.payload.item !== currentItem) {
          return
        }
        if (!isCostSatisfiable(currentItem[0], state.resources)) {
          return
        }
        state.resources = removeResources(currentItem[0], state.resources)
        state.resources = addResources(currentItem[1], state.resources)
        state.items.shift()
      }
    },
    stepQuest: (state, action) => {
      let step = state.room.options
      let currentStep = current(step)
      if (!step || !currentStep) {
        return
      }

      let currentChoice = currentStep.find(x => x === action.payload.choice)
      if (!currentChoice) {
        return
      }
      if (!isCostSatisfiable(currentChoice.cost, state.resources)) {
        return
      }
      state.resources = removeResources(currentChoice.cost, state.resources)
      if (currentChoice.destination.options.length == 0 ) {
        state.status = 'victory'
      }

      state.room = currentChoice.destination
      

    },
    upgrade: (state, action) => {
      if (action.payload.green) {
        let upgrade = state.greenUpgrades.find(x => !x[1])
        let currentUpgrade = current(upgrade)
        if (!upgrade || !currentUpgrade || action.payload.green !== currentUpgrade) {
          return
        }
        if (!isCostSatisfiable(currentUpgrade[0], state.resources)) {
          return
        }
        state.availableSpells = state.availableSpells.concat(currentUpgrade[3])
        state.resources = removeResources(currentUpgrade[0], state.resources)
        state.greenFnParams = combineGreenParams(state.greenFnParams, currentUpgrade[2])
        upgrade[1] = true;
      }
      if (action.payload.red) {
        let upgrade = state.redUpgrades.find(x => !x[1])
        let currentUpgrade = current(upgrade)
        if (!upgrade || !currentUpgrade || action.payload.red !== currentUpgrade) {
          return
        }
        if (!isCostSatisfiable(currentUpgrade[0], state.resources)) {
          return
        }
        state.availableSpells = state.availableSpells.concat(currentUpgrade[3])
        state.resources = removeResources(currentUpgrade[0], state.resources)
        state.redFnParams = combineRedParams(state.redFnParams, currentUpgrade[2])
        upgrade[1] = true;
      }
      if (action.payload.blue) {
        let upgrade = state.blueUpgrades.find(x => !x[1])
        let currentUpgrade = current(upgrade)
        if (!upgrade || !currentUpgrade || action.payload.blue !== currentUpgrade) {
          return
        }
        if (!isCostSatisfiable(currentUpgrade[0], state.resources)) {
          return
        }
        state.availableSpells = state.availableSpells.concat(currentUpgrade[3])
        state.resources = removeResources(currentUpgrade[0], state.resources)
        state.blueFnParams = combineBlueParams(state.blueFnParams, currentUpgrade[2])
        upgrade[1] = true;
      }
    },

  },

});

function handleSpell(state: Draft<GameState>, spell: Spell) {
  let interaction = getRoomInteractions(state.room.name)
  let result = interaction(state, spell)

  let doorResults = state.room.options.map(x => getDoorInteractions(x.destination.name)(state, spell))
}

export const { incrementRed, incrementBossHP, resetState, startBossFight, startLoop, boulderKill, attackBoss, bossAttack, addCombatLogMessages, clearCombatLogMessages, incrementGreen, incrementBlue, setGameLoopIntervals, clearGameLoopIntervals, incrementHP, castSpell, resetSpell, buyItem, stepQuest, upgrade } = gameStateSlice.actions;


export const selectRed = (state: RootState) => state.gameState.resources.red;
export const selectBlue = (state: RootState) => state.gameState.resources.blue;
export const selectGreen = (state: RootState) => state.gameState.resources.green;
export const selectHP = (state: RootState) => state.gameState.resources.hp;
export const selectBossHP = (state: RootState) => state.gameState.boss.bossHp;
export const selectBossStatus = (state: RootState) => state.gameState.boss.status;
export const selectCombatLogMessages = (state: RootState) => state.gameState.combatLogMessages;
export const selectGreenFnP1 = (state: RootState) => state.gameState.greenFnParams.linearP1;
export const selectRoomName = (state: RootState) => state.gameState.room.name;

export const selectNextDoors = (state: RootState) => state.gameState.room.options || [];
export const selectGameLoopInterval = (state: RootState) => state.gameState.gameLoopInterval;

export const selectSpells = (state: RootState) => state.gameState.availableSpells;
export const selectGameStatus = (state: RootState) => state.gameState.status;
export const selectBlueDist = (state: RootState) => state.gameState.blueDist;
export const selectBluePast = (state: RootState) => state.gameState.bluePast;
export const selectGreenDist = (state: RootState) => state.gameState.greenDist;
export const selectRedDist = (state: RootState) => state.gameState.redDist;
export const selectGreenUpgradeCost = (state: RootState) => state.gameState.greenUpgrades.find(x => !x[1]);
export const selectRedUpgradeCost = (state: RootState) => state.gameState.redUpgrades.find(x => !x[1]);
export const selectBlueUpgradeCost = (state: RootState) => state.gameState.blueUpgrades.find(x => !x[1]);
export const selectItemCost = (state: RootState) => state.gameState.items[0];


export default gameStateSlice.reducer;
