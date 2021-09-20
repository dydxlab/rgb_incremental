import { QuestStep, combineRedParams, StructureStatus, Room, RoomList, SpellList } from './Types'
import { match, __, not, select, when } from 'ts-pattern';
import { GameState } from './gameStateSlice';
import {Draft } from '@reduxjs/toolkit';




export function jungleRoomInteraction(state, spell) {
    if (spell.description === SpellList.Fireball && !state.room.statuses.includes('burnt')) {
        state.room.statuses.push('burnt');
        state.redFnParams = combineRedParams({ linearP1: 3 }, state.redFnParams)
        state.combatLogMessages.unshift('You feed on the energy from the withering vines')
    } else if (spell.description === SpellList.CommuneWithPlants && !state.room.statuses.includes('burnt')) {
        state.combatLogMessages.unshift('Vines sway in sync and you hear a whisper "Seek the golden slug"')
    } else {
        state.combatLogMessages.unshift('No effect')
    }
}

export function caveRoomInteraction(state, spell) {
    if (spell.description === SpellList.FrostRay && !state.room.statuses.includes('frozen')) {
        state.room.statuses.push('frozen');
        state.combatLogMessages.unshift('Water freezes into a path to the far wall')
    } else if (spell.description === SpellList.SpectralRope && state.room.statuses.includes('frozen')) {
        state.combatLogMessages.unshift('You climb in to a narrow fissure, revealing a the Moon Door')
        state.room.options.push(moonDoor);
    } else if (spell.description === SpellList.CommuneWithPlants && !state.room.statuses.includes('burnt')) {
        state.combatLogMessages.unshift('A phosphorescent mushroom breathes in and lets out a puff of spores in the shape of a bridge and rope')
    } else {
        state.combatLogMessages.unshift('No effect')
    }
}

export function desertRoomInteraction(state, spell) {
    if (spell.description === SpellList.Fireball) {
        state.combatLogMessages.unshift('Molten glass sinks in to the sand')
    } else if (spell.description === SpellList.CommuneWithPlants ) {
        state.combatLogMessages.unshift('Wails from the void echo in your head. You stumble and fall to your knees')
        state.resources.hp -= 10;
    } else {
        state.combatLogMessages.unshift('No effect')
    }
}

export function treeTopsRoomInteraction(state, spell) {
    if (spell.description === SpellList.Fireball) {
        state.combatLogMessages.unshift('Leaves crackle and crumple but the trees stand strong')
    } else if (spell.description === SpellList.CommuneWithPlants ) {
        state.combatLogMessages.unshift('Trees lean slightly to the left')
    } else if (spell.description === SpellList.FrostRay && !state.room.statuses.includes('frozen')) {
        state.room.statuses.push('frozen');
        state.combatLogMessages.unshift('Branches shrink back, revealing the Rabbit Door')
        state.room.options.push(rabbitDoor); 
    } else {
        state.combatLogMessages.unshift('No effect')
    }
}

export function rabbitRoomInteraction(state, spell) {
    if (spell.description === SpellList.Fireball ) {
        state.room.statuses.push('burnt');
        state.combatLogMessages.unshift('Charred remains litter the floor. Rocks begin to fall from the ceiling')
        state.resources.hp -= 10;
        //Add hpFn params for faster reduction for the rest of the round
    } else if (spell.description === SpellList.Heal ) {
        state.combatLogMessages.unshift('The rabbit leaps around the room with great vigor. You feel energized just watching it.')
        //TODO: More lore
        //TODO: more, maybe better greenFnParams, 
    } else if (spell.description === SpellList.FrostRay && !state.room.statuses.includes('frozen') && !state.room.statuses.includes('burnt')) {
        state.room.statuses.push('frozen');
        state.combatLogMessages.unshift('You enrage the rabbit. It lunges at you, biting your index finger off, then bounces away')
    } else if (spell.description === SpellList.SpectralRope) {
        state.combatLogMessages.unshift('You lower a rope through a crack in the floor, giving you a better avenue to proceed')
        state.room.options.push(ropeMonsterDoor)
    } else {
        state.combatLogMessages.unshift('No effect')
    }
}

export function monstersRoomInteraction(state, spell) {
    
}

export function boulderDodgeRoomInteraction(state, spell) {
    state.combatLogMessages.unshift('No effect')
}


export function desertDoorInteraction(state, spell) {
    if (spell.type === 'Fireball') {
        state.combatLogMessages.unshift('Flames dance across the sand haplessly');
    } else {
        state.combatLogMessages.unshift('No effect');
    }
}
export function monstersDoorInteraction(state: Draft<GameState>, spell) {
    if (spell.description === SpellList.Fireball || spell.description === SpellList.FrostRay ) {
        state.room.statuses.push('burnt');

        state.room.options.map(o => {
            for (let c in o.cost) {
                o.cost[c as keyof typeof o.cost] =  o.cost[c as keyof typeof o.cost] / 2
            }
        })
        state.combatLogMessages.unshift('You batter the monsters with your magic');

    } else if ( spell.description === SpellList.FrostRay ) {
        state.room.statuses.push('frozen');

        state.room.options.map(o => {
            for (let c in o.cost) {
                o.cost[c as keyof typeof o.cost] =  o.cost[c as keyof typeof o.cost] / 2
            }
        })
        state.combatLogMessages.unshift('You batter the monsters with your magic');

    } else if (spell.description === 'Heal' ) {
        state.room.options.map(o => {
            for (let c in o.cost) {
                o.cost[c as keyof typeof o.cost] =  o.cost[c as keyof typeof o.cost] * 2
            }
        })
        state.combatLogMessages.unshift('Your magic empowers the monsters');
    } else {
        state.combatLogMessages.unshift('No effect')
    }
}

export function getRoomInteractions(room: RoomList) {
    return match(room)
    .with(RoomList.Jungle,() => jungleRoomInteraction)
    .with(RoomList.Cave, () =>caveRoomInteraction)
    .with(RoomList.Desert,() => desertRoomInteraction)
    .with(RoomList.Boulder, () =>boulderDodgeRoomInteraction)
    .with(RoomList.Monsters,() => monstersRoomInteraction)
    .with(RoomList.TreeTops,() => treeTopsRoomInteraction)
    .with(RoomList.Rabbit,() => rabbitRoomInteraction)
    .with(RoomList.FungalColony,() => EmptyFn)
    .with(RoomList.Treasure,() => EmptyFn)
    .with(RoomList.Moon,() => EmptyFn)
    .with(RoomList.Oasis,() => EmptyFn)
    .with(RoomList.Volcano,() => EmptyFn)
    .with(RoomList.Unknown,() => EmptyFn)
    .with(RoomList.TempleRuins,() => EmptyFn)
    .with(RoomList.TempleGuardian,() => EmptyFn)  
    .with(RoomList.Sandstorm,() => EmptyFn)
    .with(RoomList.LavaFlow ,() => EmptyFn)
    .with(RoomList.CrumblingBridge,() => EmptyFn)
    .with(RoomList.TrappedInsect,() => EmptyFn)
    .with(RoomList.Wastes,() => EmptyFn)
    .with(RoomList.Lost,() => EmptyFn)
    .with(RoomList.IceChamber,() => EmptyFn)
    .with(RoomList.MagmaWaterfall,() => EmptyFn)
    .with(RoomList.StatueRoom,() => EmptyFn)
    .with(RoomList.GraniteRaft,() => EmptyFn)
    .with(RoomList.CageTrap,() => EmptyFn)
    .with(RoomList.VolcanoBoss,() => EmptyFn)
    .with(RoomList.Altar,() => EmptyFn)
    .with(RoomList.ObsidianHallway,() => EmptyFn)
    .exhaustive()
}

export function getDoorInteractions(room: RoomList){
    return match(room)
    .with(RoomList.Jungle,() => EmptyFn)
    .with(RoomList.Cave,() => EmptyFn)
    .with(RoomList.Desert,() => EmptyFn)
    .with(RoomList.Boulder,() => monstersDoorInteraction)
    .with(RoomList.Monsters,() => EmptyFn)
    .with(RoomList.TreeTops,() => EmptyFn)
    .with(RoomList.Rabbit,() => EmptyFn)
    .with(RoomList.FungalColony, () =>EmptyFn)
    .with(RoomList.Treasure, () =>EmptyFn)
    .with(RoomList.Moon,() => EmptyFn)
    .with(RoomList.Oasis,() => EmptyFn)
    .with(RoomList.Volcano,() => EmptyFn)
    .with(RoomList.Unknown,() => EmptyFn)
    .with(RoomList.TempleRuins,() => EmptyFn)
    .with(RoomList.TempleGuardian,() => EmptyFn)
    .with(RoomList.Sandstorm,() => EmptyFn)
    .with(RoomList.LavaFlow ,() => EmptyFn)
    .with(RoomList.CrumblingBridge,() => EmptyFn)
    .with(RoomList.TrappedInsect,() => EmptyFn)
    .with(RoomList.Wastes,() => EmptyFn)
    .with(RoomList.Lost,() => EmptyFn)
    .with(RoomList.IceChamber,() => EmptyFn)
    .with(RoomList.MagmaWaterfall,() => EmptyFn)
    .with(RoomList.StatueRoom,() => EmptyFn)
    .with(RoomList.GraniteRaft,() => EmptyFn)
    .with(RoomList.CageTrap,() => EmptyFn)
    .with(RoomList.VolcanoBoss,() => EmptyFn)
    .with(RoomList.Altar,() => EmptyFn)
    .with(RoomList.ObsidianHallway,() => EmptyFn)
    .exhaustive()
}

function EmptyFn(state, spell) {
    
}

export let FakeRoom: Room = {
    name: RoomList.Cave,
    statuses: new Array<StructureStatus>(),
    options: [
        
    ]
}

export let treasureRoom: Room = {
    name: RoomList.Treasure,
    statuses: new Array<StructureStatus>(),
    options: [
        
    ]
}

export let volcanoBossFightRoom: Room = {
    name: RoomList.VolcanoBoss,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.VolcanoBoss, action: "Challenge the Volcano Boss", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: FakeRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let cageTrapRoom: Room = {
    name: RoomList.CageTrap,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.VolcanoBoss, action: "Challenge the Volcano Boss", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: volcanoBossFightRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let graniteRaftRoom: Room = {
    name: RoomList.GraniteRaft,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.CageTrap, action: "Drift aimlessly", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: cageTrapRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let trappedInsectRoom: Room = {
    name: RoomList.TrappedInsect,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.GraniteRaft, action: "Ride the granite raft", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: graniteRaftRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let altarRoom: Room = {
    name: RoomList.TrappedInsect,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.TrappedInsect, action: "Move ahead into the darkness", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: trappedInsectRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let obsidianHallway: Room = {
    name: RoomList.ObsidianHallway,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Altar, action: "Kneel at the steps", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: altarRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let lavaFlowRoom: Room = {
    name: RoomList.LavaFlow,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.ObsidianHallway, action: "Kneel at the steps", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: obsidianHallway, statuses: new Array<StructureStatus>() },
        { title: RoomList.Altar, action: "Kneel at the steps", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: altarRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let crumblingBridge: Room = {
    name: RoomList.CrumblingBridge,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.LavaFlow, action: "Leap from stone to stone", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: lavaFlowRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let lost: Room = {
    name: RoomList.CrumblingBridge,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Cave, action: "Journey On", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: FakeRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let wastes: Room = {
    name: RoomList.Wastes,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Lost, action: "Navigate the wastes", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: lost, statuses: new Array<StructureStatus>() },
    ]
}


export let templeGuardianRoom: Room = {
    name: RoomList.TempleGuardian,
    statuses: new Array<StructureStatus>(),
    options: [
        
        { title: RoomList.Cave, action: "Challenge the Temple Guardian", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: FakeRoom, statuses: new Array<StructureStatus>() },

    ]
}

export let oasisRoom: Room = {
    name: RoomList.Oasis,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.TempleGuardian, action: "Challenge the Temple Guardian", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: templeGuardianRoom, statuses: new Array<StructureStatus>() },

    ]
}

export let unknownRoom: Room = {
    name: RoomList.Unknown,
    statuses: new Array<StructureStatus>(),
    options: [
        

    ]
}

export let volcanoRoom: Room = {
    name: RoomList.Volcano,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.LavaFlow, action: "Brave the fiery rocks", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: lavaFlowRoom, statuses: new Array<StructureStatus>() },
        { title: RoomList.Unknown, action: "Plunge in to the unknown", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: unknownRoom, statuses: new Array<StructureStatus>() },
    ]
}


export let boulderRoom: Room = {
    name: RoomList.Boulder,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Oasis, action: "Dive left into the web-covered pit", cost: { green: 3200, red: 0, blue: 0, hp: 0 }, destination: oasisRoom, statuses: new Array<StructureStatus>() },
        { title: RoomList.Volcano, action: "Crawl over the wall", cost: { green: 48000, red: 0, blue: 0, hp: 0 }, destination: volcanoRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let monstersRoom: Room = {
    name: RoomList.Monsters,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Boulder, action: "Tumble away from the ferocious monsters", cost: { green: 50120, red: 0, blue: 0, hp: 0 }, destination: boulderRoom, statuses: new Array<StructureStatus>() },

    ]
}

export let rabbitRoom: Room = {
    name: RoomList.Rabbit,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Monsters, action: "Slide down tunnel", cost: { green: 900, red: 1200, blue: 100, hp: 0 }, destination: monstersRoom, statuses: new Array<StructureStatus>() },

    ]
}

let ropeMonsterDoor = { title: RoomList.Monsters, action: "Rappel down behind the monster", cost: { green: 100, red: 100, blue: 10, hp: 0 }, destination: monstersRoom, statuses: new Array<StructureStatus>() }

export let treeTopsRoom: Room = {
    name: RoomList.TreeTops,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Monsters, action: "Leap into the musty cove", cost: { green: 75330, red: 0, blue: 0, hp: 0 }, destination: monstersRoom, statuses: new Array<StructureStatus>() },

    ]
}


export let templeRuinsRoom: Room = {
    name: RoomList.TempleRuins,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.TempleGuardian, action: "Face the Temple Guardian", cost: { green: 37500, red: 1200, blue: 50, hp: 0 }, destination: templeGuardianRoom, statuses: new Array<StructureStatus>() },
    ]
}

export let jungleRoom: Room = {
    name: RoomList.Jungle,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.TreeTops, action: "Shimmy into the Tree Tops", cost: { green: 2134, red: 0, blue: 0, hp: 0 }, destination: treeTopsRoom, statuses: new Array<StructureStatus>() },
        { title: RoomList.TempleRuins, action: "Venture towards the Temple Ruins", cost: { green: 4444, red: 0, blue: 0, hp: 0 }, destination: templeRuinsRoom, statuses: new Array<StructureStatus>() },
    ]
}


export let sandstormRoom: Room = {
    name: RoomList.Sandstorm,
    statuses: new Array<StructureStatus>(),
    options: [
        
    ]
}

export let desertRoom: Room = {
    name: RoomList.Desert,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Volcano, action: "Ascend the cliff face", cost: { green: 0, red: 10000, blue: 0, hp: 0 }, destination: volcanoRoom, statuses: new Array<StructureStatus>() },
        { title: RoomList.Wastes, action: "Shy away from the blazing mountain", cost: { green: 0, red: 10000, blue: 0, hp: 0 }, destination: wastes, statuses: new Array<StructureStatus>() },

    ]
}

export let moonRoom: Room = {
    name: RoomList.Moon,
    statuses: new Array<StructureStatus>(),
    options: [
        
    ]
}

export let fungalColonyRoom: Room = {
    name: RoomList.FungalColony,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Moon, action: "Gaze deeply at the moon above", cost: { green: 0, red: 0, blue: 100000, hp: 0 }, destination: moonRoom, statuses: new Array<StructureStatus>() },

    ]
}

let moonDoor = { title: RoomList.FungalColony, action: "Venture behind the veil", cost: { green: 100, red: 100, blue: 10, hp: 0 }, destination: fungalColonyRoom, statuses: new Array<StructureStatus>() }
let rabbitDoor = { title: RoomList.Rabbit, action: "Hurdle over the frozen brambles", cost: { green: 100, red: 100, blue: 10, hp: 0 }, destination: rabbitRoom, statuses: new Array<StructureStatus>() }


export let caveRoom: Room = {
    name: RoomList.Cave,
    statuses: new Array<StructureStatus>(),
    options: [
        { title: RoomList.Jungle, action: "Swing from the vines", cost: { green: 340, red: 0, blue: 0, hp: 0 }, destination: jungleRoom, statuses: new Array<StructureStatus>() },
        { title: RoomList.Desert, action: "Brave the wastes", cost: { green: 970, red: 800, blue: 290, hp: 0 }, destination: desertRoom, statuses: new Array<StructureStatus>() }
    ]
}


