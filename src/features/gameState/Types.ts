
const pd = require('probability-distributions');

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

export interface GreenFnParams {
    linearP1: number;
    quadraticP1: number;
    twoPowerP1: number;
}

export interface BlueFnParams {
    normalP1: number;
    normalP2: number;
}

export interface RedFnParams  {
    linearP1: number;
}


export interface HPFnParams  {
    linearP1: number;
}


export interface Spell {
    description?: String;
    cooldown?: number;
    available?: boolean;
}


export type GSResourceName = "red" | "blue" | "green" | "hp";
export type GameStatus = "ready" | "started" | "victory" | "gameOver";
export type StructureStatus = "burnt" | "frozen" | "flourishing";

export type Cost = Record<GSResourceName, number>
export type ResourceBonus = Record<GSResourceName, number>

export interface Room {
    statuses: Array<StructureStatus>;
    options: Array<CYOAOption>;
    name: String;
  }

export function isCostSatisfiable(cost: Cost, resources: Record<GSResourceName, number>): boolean {
    for (let c in cost) {
        if (cost[c as keyof typeof cost] > resources[c as keyof typeof resources]) return false
    }
    return true
}

export function removeResources(cost: Cost, resources: Record<GSResourceName, number>) {
    for (let c in cost) {
        resources[c as keyof typeof resources] -= cost[c as keyof typeof cost]
    }
    return resources
}

export function addResources(cost: Cost, resources: Record<GSResourceName, number>) {
    for (let c in cost) {
        resources[c as keyof typeof resources] += cost[c as keyof typeof cost]
    }
    return resources
}

export function combineGreenParams(a: GreenFnParams, b: GreenFnParams): GreenFnParams {
    for (let i in a) {
        a[i as keyof typeof a] = a[i as keyof typeof a] + b[i as keyof typeof b]
    }
    return a
}

export function combineRedParams(a: RedFnParams, b: RedFnParams): RedFnParams {
    for (let i in a) {
        a[i as keyof typeof a] = a[i as keyof typeof a] + b[i as keyof typeof b]
    }
    return a
}

export function combineBlueParams(a: BlueFnParams, b: BlueFnParams): BlueFnParams {
    for (let i in a) {
        a[i as keyof typeof a] = a[i as keyof typeof a] + b[i as keyof typeof b]
    }
    return a
}



export function greenFn(params: GreenFnParams) {
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
  
  
  export function redFn(params: RedFnParams) {
    let total = 0
    if (params.linearP1) {
      total += params.linearP1
    }
  
    return total
  }
  
  
  
  
  export function blueFn(params: BlueFnParams) {
    let total = 0.0
    if (params.normalP1 > 0 && params.normalP2 > 0) {
      total += Math.max(0, pd.rnorm(1,params.normalP1, params.normalP2))
    }
  
    return total
  }
  
  
  
  export function hpFn(params: HPFnParams) {
    let total = 0
    if (params.linearP1) {
      total += params.linearP1
    }
  
    return total
  }