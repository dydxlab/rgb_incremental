//@ts-ignore


/*
You are in a room
You can interact with the room
You can interact with the doors
Interaction is through spells

if(fire){
    lower cost by 2000
}if(speak with plants){
    reveal dialogue/lore/secrets
}
if(frost){
    open secret door
}
if(rope){
    Do nothing
}

*/
export type Status = "burnt" | "frozen" | "flourishing";

 

export type RoomInteraction = {
    //minus resources
    //dialogue
    //change costs
}

export type RoomState = {
    statuses: Set<Status>
}





function desertRoomInteraction(room, spell){
    if(spell.type === 'fire'){
        return {'message': "Molten glass sinks in to the sand"}    
    } else if (spell.type === 'communeWithPlants') {
        return {'message': 'Wails from the void echo in your head. You stumble and fall to your knees', 'effect': {'hp': -10}}
    } else  {
        return {'message': 'No effect'}
    }


    room.doors.apply(spell)
}



function jungleDoorInteraction(door, spell){
    if(spell.type === 'fire'){
        return {'message': "The door wilts then hardens", "roomstatus": "burnt"}    
    } else if (spell.type === 'communeWithPlants' && door.notBurnt) {
        return {'message': 'The door loosens and vines unfurl', 'costReduction': '500G', 'status': 'flourishing'}
    } else  {
        return {'message': 'No effect'}
    }
}

function desertDoorInteraction(door, spell){
    return {'message': 'No effect'}
}

function caveRoomInteraction(room, spell){
    if(spell.type === 'frostRay'){
        return {'message': "A fragile path to the rear wall appears", 'room': 'frozen', 'duration': 50000}    
    } else if(spell.type === 'spectralRope'){
        return {'message': "You climb in to a narrow fissure, revealing a fire-soaked iron door", 'addDoor': 'moonDoor'}    
    } else  {
        return {'message': 'No effect'}
    }

}

function caveDoorInteraction(door, spell) {
    if(spell.type === 'communeWithPlants'){
        return {'message': 'A phosphorescent mushroom breathes in and lets out a puff of spores in the shape of a bridge and rope'}
    } else {
        return {'message': "No effect"}
    }
}


let roomInteractions = {
    'jungle': jungleRoomInteraction,
    'cave': caveRoomInteraction,
    'desert': desertRoomInteraction
}

let doorInteractions = {
    'jungle': jungleDoorInteraction,
    'desert': desertDoorInteraction
}

function jungleRoomInteraction(state, spell){
    if(spell.type === 'fireball'){
        //state.greenFnParams = combineGreenParams({ linearP1: 4, quadraticP1: 4, twoPowerP1: 4 }, state.greenFnParams)
    } else if (spell.type === 'communeWithPlants' && state.room.status.has('burnt')) {
        state.combatLogMessage.push('Vines sway in sync and you hear a whisper "Seek the golden slug"')
    } else {
        state.combatLogMessage.push('No effect')
    }
}


function handleSpell(state, spell) {
    let interaction = roomInteractions[state.room.name]
    let result = interaction(state, spell)

    let doorResults = state.options.map(x => doorInteractions[x](state, spell))

}