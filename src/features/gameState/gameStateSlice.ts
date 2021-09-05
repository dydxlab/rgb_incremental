import { types } from '@babel/core';
import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {Spell, 
  Cost, 
  GreenFnParams, 
  BlueFnParams, 
  RedFnParams,  
redFn, 
blueFn, 
greenFn, 
hpFn, 
ResourceBonus, 
Room, 
QuestStep, 
CYOAOption, 
StructureStatus, 
GSResourceName, 
HPFnParams, 
GameStatus, 
combineRedParams, 
combineBlueParams, 
combineGreenParams, 
addResources, 
removeResources, 
isCostSatisfiable,
} from './Types'
import {initializeTier1, Item, } from './Items'
import {jungleRoom, quest2, roomInteractions, doorInteractions} from './Quest'



let GreenUpgrade: [Cost, boolean, GreenFnParams]
let BlueUpgrade: [Cost, boolean, BlueFnParams]
let RedUpgrade: [Cost, boolean, RedFnParams]


let spells1: Array<Spell> = [
  {description: 'Fireball', cooldown: 5000, available: true, },
  {description: 'Commune with Plants', cooldown: 1000, available: true},
  {description: 'Heal', },
  {description: 'Frost Ray', available: true, },
  {description: 'Spectral Rope', available: true, }
]








export interface GameState {
  resources: Record<GSResourceName, number>;
  gameLoopInterval: number;
  availableSpells: Array<Spell>;
  room: Room;
  questSteps: Array<QuestStep>;
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
    red: 0,
    green: 20, // 20
    blue: 3, //3
    hp: 100
  },
  room: jungleRoom,
  gameLoopInterval: 0,
  questSteps: quest2,
  availableSpells: spells1,
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
    [{ green: 13, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 0, twoPowerP1: 0 }],
    [{ green: 29, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 0, twoPowerP1: 0 }],
    [{ green: 105, red: 0, blue: 0, hp: 0 }, false, { linearP1: 4, quadraticP1: 0, twoPowerP1: 0 }],
    [{ green: 82, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 0 }],
    [{ green: 379, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0, quadraticP1: 3, twoPowerP1: 0 }],
    [{ green: 1800, red: 0, blue: 7, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 10 }],
    [{ green: 500000, red: 100, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 2 }],
    [{ green: 1000000000, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 10 }],

  ],
  redUpgrades: [
    [{ green: 13, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3 }],
    [{ green: 37, red: 0, blue: 1, hp: 0 }, false, { linearP1: 0.3 }],
    [{ green: 105, red: 0, blue: 3, hp: 0 }, false, { linearP1: 4 }],
    [{ green: 10, red: 0, blue: 0, hp: 0 }, false, { linearP1: 0.3 }],
    [{ green: 7000, red: 0, blue: 0, hp: 0 }, false, { linearP1: 8 }],
    [{ green: 61589, red: 0, blue: 55, hp: 0 }, false, { linearP1: 22 }],

  ],
  blueUpgrades: [
    [{ green: 9, red: 45, blue: 0, hp: 0 }, false, { normalP1: 0.0002, normalP2: 0.0001 }],
    [{ green: 499, red: 0, blue: 2, hp: 0 }, false, { normalP1: 0, normalP2: 0.5 }],
    [{ green: 0, red: 389, blue: 21, hp: 0 }, false, { normalP1: 2, normalP2: 0 }],
    [{ green: 0, red: 0, blue: 131, hp: 0 }, false, { normalP1: 0, normalP2: 10 }],
    [{ green: 0, red: 0, blue: 305, hp: 0 }, false, { normalP1: 0, normalP2: 10 }],
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
      return initialStateCopy;
    },
    incrementRed: (state) => {
      state.resources.red += redFn(state.redFnParams);
      state.redDist.push(redFn(state.redFnParams));
      state.redDist.shift();
    },
    castSpell: (state, payload) => {
      if(payload){
        let spell = state.availableSpells.find(x => x.description === payload.payload.description)
        if(spell) {
          spell.available = false
          handleSpell(state, spell)
        }
      }
    },
    resetSpell: (state, payload) => {
      if(payload){
        let spell = state.availableSpells.find(x => x.description === payload.payload.description)
        if(spell) {
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
      if(state.resources.hp <= 0) {
        state.status = "gameOver"
        console.log(state.status)
      }
    },
    setGameLoopIntervals: (state, action) => {
      state.gameLoopInterval = action.payload
    },
    clearGameLoopIntervals: (state) => {
      clearInterval(state.gameLoopInterval);
      state.gameLoopInterval = 0;
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
      
      let step = state.questSteps.find(x => x.active)
      let currentStep = current(step)
      if (!step || !currentStep) {
        return
      }

      let currentChoice = currentStep.options.find(x => x == action.payload.choice )
      if(!currentChoice) {
        return
      }
      if (!isCostSatisfiable(currentChoice.cost, state.resources)) {
        return
      }
      state.resources = removeResources(currentChoice.cost, state.resources)

      step.active = false
      if(!state.questSteps.find(x => x.active)) {
        state.status = 'victory'
      }

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
        state.resources = removeResources(currentUpgrade[0], state.resources)
        state.blueFnParams = combineBlueParams(state.blueFnParams, currentUpgrade[2])
        upgrade[1] = true;
      }
    },

  },

});

function handleSpell(state, spell) {
  console.log('handling')

  let interaction = roomInteractions[state.room.name]
  let result = interaction(state, spell)

  let doorResults = state.room.options.map(x => doorInteractions[x.title](state, spell))
  console.log(current(state.combatLogMessages))
}

export const { incrementRed, resetState, startLoop, clearCombatLogMessages, incrementGreen, incrementBlue, setGameLoopIntervals, clearGameLoopIntervals, incrementHP, castSpell, resetSpell, buyItem, stepQuest, upgrade } = gameStateSlice.actions;


export const selectRed = (state: RootState) => state.gameState.resources.red;
export const selectBlue = (state: RootState) => state.gameState.resources.blue;
export const selectGreen = (state: RootState) => state.gameState.resources.green;
export const selectHP = (state: RootState) => state.gameState.resources.hp;
export const selectCombatLogMessages = (state: RootState) => state.gameState.combatLogMessages;
export const selectGreenFnP1 = (state: RootState) => state.gameState.greenFnParams.linearP1;
export const selectNextDoors = (state: RootState) => state.gameState.room.options || [];

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
