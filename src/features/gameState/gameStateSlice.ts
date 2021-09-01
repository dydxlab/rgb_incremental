import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
//import {rbeta} from 'probability-distributions'
const pd = require('probability-distributions');


export type GSResourceName = "red" | "blue" | "green";


let GreenUpgrade: [Record<GSResourceName, number>, boolean, GreenFnParams]
let BlueUpgrade: [Record<GSResourceName, number>, boolean, BlueFnParams]
let RedUpgrade: [Record<GSResourceName, number>, boolean, RedFnParams]

let ItemBonus: Record<GSResourceName, number>

function shuffle<T>(a: Array<T>): Array<T> {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let Item: [Record<GSResourceName, number>, Record<GSResourceName, number>]
//TODO INCORPORATE THESE
function initializeTier1(): Array<typeof Item>{
  let itemsTier1: Array<Record<GSResourceName, number>> = [
    { green: 0, red: 0, blue: 1 },
    { green: 0, red: 19, blue: 0 },
    { green: 42, red: 0, blue: 0 },
    { green: 66, red: 0, blue: 0 },
    { green: 20, red: 20, blue: 0 },
    { green: 7, red: 2, blue: 0 },
  ]

  let costsTier1: Array< Record<GSResourceName, number>> = [
    { green: 98, red: 0, blue: 0 },
    { green: 117, red: 0, blue: 0 },
    { green: 193, red: 0, blue: 0 },
    { green: 338, red: 0, blue: 0 },
    { green: 680, red: 0, blue: 0 },
    { green: 1033, red: 0, blue: 0 },
  ]

  itemsTier1 = shuffle(itemsTier1)
  let items: Array<typeof Item> = []
  for( let i in costsTier1){
    items.push([costsTier1[i], itemsTier1[i]]);
  }
  return items
}



let itemsTier2: Array<typeof ItemBonus> = [
  { green: 0, red: 0, blue: 104 },
  { green: 0, red: 290, blue: 0 },
  { green: 4255, red: 0, blue: 0 },
  { green: 660, red: 0, blue: 0 },
  { green: 808, red: 935  , blue: 0 },
  { green: 7, red: 2, blue: 0 },
]


//Always green


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

export interface GameState {
  resources: Record<GSResourceName, number>;
  items: Array<typeof Item>;
  redFnParams: RedFnParams;
  greenFnParams: GreenFnParams;
  blueFnParams: BlueFnParams;
  loopStarted: boolean;
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
    green: 2000, // 20
    blue: 3,
  },
  items: initializeTier1(),
  redFnParams: { linearP1: 1 },
  greenFnParams: { linearP1: 2, quadraticP1: 0, twoPowerP1: 0 },
  blueFnParams: { normalP1: 0, normalP2: 0 },
  blueDist: [0, 0, 0, 0],
  bluePast: [...Array(40).keys()].map(i => 0),
  greenDist: [...Array(40).keys()].map(i => 0),
  redDist: [...Array(40).keys()].map(i => 0),
  loopStarted: false,
  greenUpgrades: [
    [{ green: 13, red: 0, blue: 0 }, false, { linearP1: 0.3, quadraticP1: 0, twoPowerP1: 0 }],
    [{ green: 29, red: 0, blue: 0 }, false, { linearP1: 0.3, quadraticP1: 0, twoPowerP1: 0 }],
    [{ green: 105, red: 0, blue: 0 }, false, { linearP1: 4, quadraticP1: 0, twoPowerP1: 0 }],
    [{ green: 82, red: 0, blue: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 0 }],
    [{ green: 379, red: 0, blue: 0 }, false, { linearP1: 0, quadraticP1: 3, twoPowerP1: 0 }],
    [{ green: 1800, red: 0, blue: 7 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 10 }],
    [{ green: 500000, red: 100, blue: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 2 }],
    [{ green: 1000000000, red: 0, blue: 0 }, false, { linearP1: 0.3, quadraticP1: 1, twoPowerP1: 10 }],

  ],
  redUpgrades: [
    [{ green: 13, red: 0, blue: 0 }, false, { linearP1: 0.3 }],
    [{ green: 37, red: 0, blue: 1 }, false, { linearP1: 0.3 }],
    [{ green: 105, red: 0, blue: 3 }, false, { linearP1: 4 }],
    [{ green: 10, red: 0, blue: 0 }, false, { linearP1: 0.3 }],
    [{ green: 7000, red: 0, blue: 0 }, false, { linearP1: 8 }],
    [{ green: 61589, red: 0, blue: 55 }, false, { linearP1: 22 }],

  ],
  blueUpgrades: [
    [{ green: 9, red: 45, blue: 0 }, false, { normalP1: 0.0002, normalP2: 0.0001 }],
    [{ green: 499, red: 0, blue: 2 }, false, { normalP1: 0, normalP2: 0.5 }],
    [{ green: 0, red: 389, blue: 21 }, false, { normalP1: 2, normalP2: 0 }],
    [{ green: 0, red: 0, blue: 131 }, false, { normalP1: 0, normalP2: 10 }],
    [{ green: 0, red: 0, blue: 305 }, false, { normalP1: 0, normalP2: 10 }],
  ]


};

function isCostSatisfiable(cost: Record<GSResourceName, number>, resources: Record<GSResourceName, number>): boolean {
  for (let c in cost) {
    if (cost[c as keyof typeof cost] > resources[c as keyof typeof resources]) return false
  }
  return true
}

function removeResources(cost: Record<GSResourceName, number>, resources: Record<GSResourceName, number>) {
  for (let c in cost) {
    resources[c as keyof typeof resources] -= cost[c as keyof typeof cost]
  }
  return resources
}

function addResources(cost: Record<GSResourceName, number>, resources: Record<GSResourceName, number>) {
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

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startLoop: (state) => {
      state.loopStarted = true;
    },
    incrementRed: (state) => {
      state.resources.red += redFn(state.redFnParams);
      state.redDist.push(redFn(state.redFnParams));
      state.redDist.shift();
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

declare global {
  interface Window { MyNamespace: any; }
}


export const { incrementRed, startLoop, incrementGreen, incrementBlue, buyItem, upgrade } = gameStateSlice.actions;

// The function below is called a selector and allows us to select a red from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.red)`
export const selectRed = (state: RootState) => state.gameState.resources.red;
export const selectBlue = (state: RootState) => state.gameState.resources.blue;
export const selectGreen = (state: RootState) => state.gameState.resources.green;
export const selectGreenFnP1 = (state: RootState) => state.gameState.greenFnParams.linearP1;

export const selectLoopStarted = (state: RootState) => state.gameState.loopStarted;
export const selectBlueDist = (state: RootState) => state.gameState.blueDist;
export const selectBluePast = (state: RootState) => state.gameState.bluePast;
export const selectGreenDist = (state: RootState) => state.gameState.greenDist;
export const selectRedDist = (state: RootState) => state.gameState.redDist;
export const selectGreenUpgradeCost = (state: RootState) => state.gameState.greenUpgrades.find(x => !x[1]);
export const selectRedUpgradeCost = (state: RootState) => state.gameState.redUpgrades.find(x => !x[1]);
export const selectBlueUpgradeCost = (state: RootState) => state.gameState.blueUpgrades.find(x => !x[1]);
export const selectItemCost = (state: RootState) => state.gameState.items[0];


export default gameStateSlice.reducer;
