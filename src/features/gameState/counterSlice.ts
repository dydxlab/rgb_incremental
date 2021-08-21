import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';


interface GreenFnParams {
  linearP1?: number;
  quadraticP1?: number;
  twoPowerP1?: number;
}

function greenFn(params: GreenFnParams) {
  let total = 0
  if(params.linearP1) {
    total += params.linearP1
  }
  if(params.quadraticP1) {
    total += ( params.quadraticP1 * params.quadraticP1 )
  }
  if(params.twoPowerP1) {
    total += ( Math.pow(2, params.twoPowerP1))
  }
  return total
}

interface RedFnParams {
  linearP1?: number;
}

function redFn(params: RedFnParams) {
  let total = 0
  if(params.linearP1) {
    total += params.linearP1
  }
  
  return total
}


interface BlueFnParams {
  linearP1?: number;
}

function blueFn(params: BlueFnParams) {
  let total = 0
  if(params.linearP1) {
    total += params.linearP1
  }
  
  return total
}

export interface CounterState {
  red: number;
  green: number;
  blue: number
  redFnParams: RedFnParams;
  greenFnParams: GreenFnParams;
  blueFnParams: BlueFnParams;
  loopStarted: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  red: 0,
  green: 0,
  blue: 2,
  redFnParams: {linearP1: 1},
  greenFnParams: {linearP1: 2},
  blueFnParams: {linearP1: 0},

  loopStarted: false,
  status: 'idle',
};

upgrades = [

  {'greenFnParams': {linearP1: 1}},
  {'greenFnParams': {linearP1: 2}},
  {'redFnParams': {linearP1: 1}},
  {'greenFnParams': {quadraticP1: 1}},
  {'greenFnParams': {quadraticP1: 4}},
]


export const counter1Slice = createSlice({
  name: 'counter1',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startLoop: (state) => {
      state.loopStarted = true;
    },
    incrementRed: (state) => {
      state.red += redFn(state.redFnParams);
    },

    incrementBlue: (state) => {
      state.blue += blueFn(state.blueFnParams);
    },
    incrementGreen: (state) => {
      state.green += greenFn(state.greenFnParams);
    },
    incrementGreenFnP1: (state) => {
      if(!state.greenFnParams.linearP1){
        state.greenFnParams.linearP1 = 0
      }
      state.greenFnParams.linearP1 += 1;
    },

  },
 
});

export const { incrementRed, startLoop,  incrementGreen, incrementGreenFnP1 } = counter1Slice.actions;

// The function below is called a selector and allows us to select a red from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.red)`
export const selectRed = (state: RootState) => state.counter1.red;
export const selectBlue = (state: RootState) => state.counter1.blue;
export const selectGreen = (state: RootState) => state.counter1.green;
export const selectGreenFnP1 = (state: RootState) => state.counter1.greenFnParams.linearP1;

export const selectLoopStarted = (state: RootState) => state.counter1.loopStarted;


export default counter1Slice.reducer;
