
const pd = require('probability-distributions');

export interface CYOAOption {
    description?: String;
    title?: String;
    action?: String;
    image?: String;
    cost: Cost;
    destination: Room;
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
    description: SpellList;
    cooldown?: number;
    available: boolean;
}


export type GSResourceName = "red" | "blue" | "green" | "hp";
export type GameStatus = "ready" | "started" | "victory" | "bossFight" | "gameOver";
export type StructureStatus = "burnt" | "frozen" | "flourishing";


export enum RoomList {
    Desert = "Desert",
    Volcano = "Volcano",
    TempleRuins = "Temple Ruins",
    TempleGuardian = "Temple Guardian",
    Unknown = "Unknown",
    Jungle = "Jungle",
    Cave = "Cave",
    Moon = "Moon",
    Sandstorm = "Sandstorm",
    Rabbit = "Rabbit",
    Oasis = "Oasis",
    Treasure = "Treasure",
    Boulder = "Boulder",
    TreeTops = "Tree Tops",
    Monsters = "Monsters",
    FungalColony = "Fungal Colony",
    LavaFlow = "Lava Flow",
    CrumblingBridge="Crumbling Bridge",
    TrappedInsect="Trapped Insect",
    Wastes="Wastes",
    Lost="Lost",
    IceChamber="Ice Chamber",
    MagmaWaterfall="Magma Waterfall",
    StatueRoom="Statue Room",
    GraniteRaft="Granite Raft",
    CageTrap="Cage Trap",
    VolcanoBoss="Volcano Boss",
    Altar="Altar",
    ObsidianHallway="Obsidian Hallway",
}


export enum SpellList {
    Fireball = "Fireball",
    FrostRay = "Frost Ray",
    Heal = "Heal",
    CommuneWithPlants = "Commune with Plants",
    SpectralRope = "Spectral Rope"
}

export type Cost = Record<GSResourceName, number>
export type ResourceBonus = Record<GSResourceName, number>

export const spells1 = {
  Fireball: { description: SpellList.Fireball, cooldown: 20000, available: true, },
  CommuneWithPlants: { description: SpellList.CommuneWithPlants, cooldown: 3000, available: true },
  Heal:   { description: SpellList.Heal, cooldown: 5000, available: true},
  FrostRay:   { description: SpellList.FrostRay, cooldown: 5000,  available: true, },
  SpectralRope:  { description: SpellList.SpectralRope, cooldown: 5000, available: true, }
}

export interface Room {
    statuses: Array<StructureStatus>;
    options: Array<CYOAOption>;
    name: RoomList;
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