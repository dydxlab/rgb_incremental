import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface CYOAOption {
  description?: String;
  title?: String;
  action?: String;
  image?: String;
  resourceDelta?: Object;
}

export interface QuestStep {
  options: Array<CYOAOption>;
  active: boolean;
}

export interface CYOAState {
  steps: Array<QuestStep>;
}

let quest1: Array<QuestStep> = [
  {options: [{title:"Puzzle", action: "Solve it - 19B"}, {title:"Battle", action: "Fight him - 340R"}], active: true},
  {options: [{title:"Jungle", action: "Swing from vine to vine - 50120G"}, {title:"Desert", action: "Brave the wastes - 290B 800R 19439G"}], active: true},
  {options: [{title:"Lions", action: "Wrestle them to the ground - 19478G"}, {title:"Bears", action: "Punch them in the face - 8905R"}], active: true}
]

const initialState: CYOAState = {
  steps: quest1
};

export const cyoaStateSlice = createSlice({
  name: 'cyoaState',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    step: (state, action) => {
      
      let step = state.steps.find(x => x.active)
      let currentStep = current(step)
      if (!step || !currentStep) {
        return
      }

      let currentChoice = currentStep.options.find(x => x == action.payload.choice )
      if(!currentChoice) {
        return
      }
      //doThing(action.payload.choice)
      step.active = false

    },
   

  },

});

export const { step } = cyoaStateSlice.actions;

export const selectNextOptions = (state: RootState) => state.cyoaState.steps.find(x => x.active)?.options || [];

export default cyoaStateSlice.reducer;
