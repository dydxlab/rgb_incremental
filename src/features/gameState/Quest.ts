import {QuestStep, combineRedParams, StructureStatus, Room } from './Types'



export function jungleRoomInteraction(state, spell){
    
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
  
  export function caveDoorInteraction(state, spell) {
    if(spell.type === 'Commune with Plants'){
        state.combatLogMessages.push('A phosphorescent mushroom breathes in and lets out a puff of spores in the shape of a bridge and rope')
    } else {
      state.combatLogMessages.push("No effect");
    }
  }
  
  export function desertDoorInteraction(state, spell){
    if(spell.type === 'Fireball'){
      state.combatLogMessages.push('Flames dance across the sand haplessly');
    } else {
      state.combatLogMessages.push('No effect');
    }
  }
  
  
  export let roomInteractions = {
    'Jungle': jungleRoomInteraction,
  }
  
  export let doorInteractions = {
    'Cave': caveDoorInteraction,
    'Desert': desertDoorInteraction
  }
  
  
  export let quest1: Array<QuestStep> = [
    {options: [{title:"Puzzle", action: "Solve it", cost: { green: 0, red: 0, blue: 19, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Battle", action: "Fight him", cost: { green: 0, red: 340, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true},
    {options: [{title:"Jungle", action: "Swing from vine to vine", cost: { green: 50120, red: 0, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Desert", action: "Brave the wastes", cost: { green: 19439, red: 800, blue: 290, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true},
    {options: [{title:"Lions", action: "Wrestle them to the ground", cost: { green: 19478, red: 0, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Bears", action: "Punch them in the face", cost: { green: 0, red: 8905, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true}
  ]
  
  export let quest2: Array<QuestStep> = [
    {options: [{title:"Cave", action: "Delve deeper", cost: { green: 50120, red: 0, blue: 0, hp: 0  }, statuses: new Array<StructureStatus>()}, {title:"Desert", action: "Brave the wastes", cost: { green: 19439, red: 800, blue: 290, hp: 0  }, statuses: new Array<StructureStatus>()}], active: true},
  ]
  
  
  
  export let jungleRoom: Room = {
    name: 'Jungle',
    statuses: new Array<StructureStatus>(),
    options: Object.assign([], quest2[0].options)
  }