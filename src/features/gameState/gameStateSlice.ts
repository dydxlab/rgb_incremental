import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
//import {rbeta} from 'probability-distributions'
const pd = require('probability-distributions');


export type GSResourceName = "red" | "blue" | "green" | "hp";
export type GameStatus = "ready" | "started" | "victory" | "gameOver";
export type StructureStatus = "burnt" | "frozen" | "flourishing";

export type Cost = Record<GSResourceName, number>
export type ResourceBonus = Record<GSResourceName, number>

let GreenUpgrade: [Cost, boolean, GreenFnParams]
let BlueUpgrade: [Cost, boolean, BlueFnParams]
let RedUpgrade: [Cost, boolean, RedFnParams]

export interface Spell {
  description?: String;
  cooldown?: number;
  available?: boolean;
}

let spells1: Array<Spell> = [
  {description: 'Fireball', cooldown: 5000, available: true, },
  {description: 'Commune with Plants', cooldown: 1000, available: true},
  {description: 'Heal', },
  {description: 'Frost Ray', },
  {description: 'Spectral Rope', }
]

function shuffle<T>(a: Array<T>): Array<T> {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let Item: [Cost, ResourceBonus]

function initializeTier1(): Array<typeof Item>{
  let itemsTier1: Array<ResourceBonus> = [
    { green: 0, red: 0, blue: 1, hp: 0 },
    { green: 0, red: 19, blue: 0, hp: 0 },
    { green: 42, red: 0, blue: 0, hp: 0 },
    { green: 66, red: 0, blue: 0, hp: 0 },
    { green: 20, red: 20, blue: 0, hp: 0 },
    { green: 7, red: 2, blue: 0, hp: 10 },
  ]

  let costsTier1: Array<Cost> = [
    { green: 65, red: 0, blue: 0, hp: 0  },
    { green: 87, red: 0, blue: 0, hp: 0 },
    { green: 123, red: 0, blue: 0, hp: 0 },
    { green: 198, red: 0, blue: 0, hp: 0 },
    { green: 270, red: 0, blue: 0, hp: 0 },
    { green: 1033, red: 0, blue: 0, hp: 0 },
  ]

  itemsTier1 = shuffle(itemsTier1)
  let items: Array<typeof Item> = []
  for( let i in costsTier1){
    items.push([costsTier1[i], itemsTier1[i]]);
  }
  return items
}



let itemsTier2: Array<ResourceBonus> = [
  { green: 0, red: 0, blue: 104, hp: 0 },
  { green: 0, red: 290, blue: 0, hp: 0 },
  { green: 4255, red: 0, blue: 0, hp: 0 },
  { green: 660, red: 0, blue: 0, hp: 24 },
  { green: 808, red: 935  , blue: 0, hp: 0 },
  { green: 7, red: 2, blue: 0, hp: 0 },
]


export interface CYOAOption {
  description?: String;
  title?: String;
  action?: String;
  image?: String;
  cost: Cost;
  statuses: Array<StructureStatus>;
}

export interface QuestStep {
  options: Array<CYOAOption>;
  active: boolean;
}


function jungleRoomInteraction(state, spell){
  let l = current(state)
  console.log('ssh')
  if(spell.description === 'Fireball' && !state.room.statuses.includes('burnt')){
    state.room.statuses.push('burnt');
    state.redFnParams = combineRedParams({ linearP1: 3 }, state.redFnParams)
    state.combatLogMessages.push('You feed on the energy from the withering vines')
  } else if (spell.description === 'Commune with Plants' && !state.room.statuses.includes('burnt')) {
      state.combatLogMessages.push('Vines sway in sync and you hear a whisper "Seek the golden slug"')
  } else {
      state.combatLogMessages.push('No effect')
  }
}

function caveDoorInteraction(state, spell) {
  if(spell.type === 'Commune with Plants'){
      state.combatLogMessages.push('A phosphorescent mushroom breathes in and lets out a puff of spores in the shape of a bridge and rope')
      //return {'message': 'A phosphorescent mushroom breathes in and lets out a puff of spores in the shape of a bridge and rope'}
  } else {
    state.combatLogMessages.push("No effect");
  }
}

function desertDoorInteraction(state, spell){
  if(spell.type === 'Fireball'){
    state.combatLogMessages.push('Flames dance across the sand haplessly');
  } else {
    state.combatLogMessages.push('No effect');
  }
}


let roomInteractions = {
  'Jungle': jungleRoomInteraction,
}

let doorInteractions = {
  'Cave': caveDoorInteraction,
  'Desert': desertDoorInteraction
}


let quest1: Array<QuestStep> = [
  {options: [{title:"Puzzle", action: "Solve it", cost: { green: 0, red: 0, blue: 19, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Battle", action: "Fight him", cost: { green: 0, red: 340, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true},
  {options: [{title:"Jungle", action: "Swing from vine to vine", cost: { green: 50120, red: 0, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Desert", action: "Brave the wastes", cost: { green: 19439, red: 800, blue: 290, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true},
  {options: [{title:"Lions", action: "Wrestle them to the ground", cost: { green: 19478, red: 0, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Bears", action: "Punch them in the face", cost: { green: 0, red: 8905, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true}
]

let quest2: Array<QuestStep> = [
  {options: [{title:"Cave", action: "Delve deeper", cost: { green: 50120, red: 0, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Desert", action: "Brave the wastes", cost: { green: 19439, red: 800, blue: 290, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true},
]

export interface Room {
  statuses: Array<StructureStatus>;
  options: Array<CYOAOption>;
  name: String;
}

let jungleRoom: Room = {
  name: 'Jungle',
  statuses: new Array<StructureStatus>(),
  options: Object.assign([], quest2[0].options)
}

export interface GreenFnParams {
  linearP1: number;
  quadraticP1: number;
  twoPowerP1: number;
}

function greenFn(params: GreenFnParams) {
  let total = 0.0
  if (params.linearP1) {
    total += params.linearP1
  }
  if (params.quadraticP1) {
    total += (params.quadraticP1 * params.quadraticP1)
  }
  if (params.twoPowerP1) {
    total += (Math.pow(2, params.twoPowerP1))
  }
  return total
}

export interface RedFnParams {
  linearP1: number;
}

function redFn(params: RedFnParams) {
  let total = 0
  if (params.linearP1) {
    total += params.linearP1
  }

  return total
}


export interface BlueFnParams {
  normalP1: number;
  normalP2: number;
}

function blueFn(params: BlueFnParams) {
  let total = 0.0
  if (params.normalP1 > 0 && params.normalP2 > 0) {
    total += Math.max(0, pd.rnorm(1,params.normalP1, params.normalP2))
  }

  return total
}

export interface HPFnParams {
  linearP1: number;
}

function hpFn(params: HPFnParams) {
  let total = 0
  if (params.linearP1) {
    total += params.linearP1
  }

  return total
}


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
    red: 100000000000000,
    green: 2000000000000, // 20
    blue: 30000000000000,
    hp: 100
  },
  room: jungleRoom,
  gameLoopInterval: 0,
  questSteps: quest2,
  availableSpells: [spells1[0], spells1[1]],
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

function isCostSatisfiable(cost: Cost, resources: Record<GSResourceName, number>): boolean {
  for (let c in cost) {
    if (cost[c as keyof typeof cost] > resources[c as keyof typeof resources]) return false
  }
  return true
}

function removeResources(cost: Cost, resources: Record<GSResourceName, number>) {
  for (let c in cost) {
    resources[c as keyof typeof resources] -= cost[c as keyof typeof cost]
  }
  return resources
}

function addResources(cost: Cost, resources: Record<GSResourceName, number>) {
  for (let c in cost) {
    resources[c as keyof typeof resources] += cost[c as keyof typeof cost]
  }
  return resources
}

function combineGreenParams(a: GreenFnParams, b: GreenFnParams): GreenFnParams {
  for (let i in a) {
    a[i as keyof typeof a] = a[i as keyof typeof a] + b[i as keyof typeof b]
  }
  return a
}

function combineRedParams(a: RedFnParams, b: RedFnParams): RedFnParams {
  for (let i in a) {
    a[i as keyof typeof a] = a[i as keyof typeof a] + b[i as keyof typeof b]
  }
  return a
}

function combineBlueParams(a: BlueFnParams, b: BlueFnParams): BlueFnParams {
  for (let i in a) {
    a[i as keyof typeof a] = a[i as keyof typeof a] + b[i as keyof typeof b]
  }
  return a
}
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
        let spell = state.availableSpells.find(x => x.description == payload.payload.description)
        if(spell) {
          spell.available = false
          handleSpell(state, spell)
        }
      }
    },
    resetSpell: (state) => {
      state.availableSpells[0].available = true
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

export const { incrementRed, resetState, startLoop, incrementGreen, incrementBlue, setGameLoopIntervals, clearGameLoopIntervals, incrementHP, castSpell, resetSpell, buyItem, stepQuest, upgrade } = gameStateSlice.actions;

// The function below is called a selector and allows us to select a red from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.red)`
export const selectRed = (state: RootState) => state.gameState.resources.red;
export const selectBlue = (state: RootState) => state.gameState.resources.blue;
export const selectGreen = (state: RootState) => state.gameState.resources.green;
export const selectHP = (state: RootState) => state.gameState.resources.hp;
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
