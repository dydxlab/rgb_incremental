import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ThermiteState {
  grid: Array<Array<number>>;
  status: 'idle' | 'starting' | 'started' | 'finished';
  bossHP: number;
  enabled: boolean;
}

const initialState: ThermiteState = {
  //grid: [[0, 0], [1, 0]],
  grid: initializeGrid(),
  status: 'idle',
  bossHP: 100,
  enabled: false
};

function initializeGrid(){
  let n = 4
  let randomGrid = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => Math.round(Math.random())))
  return randomGrid
}


export const thermiteSlice = createSlice({
  name: 'thermite',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {

      //state.value += 1;
    },
    triggerThermite: (state, action) => {
      let coords = action.payload;
      console.log(coords)
      //let coords = [0,2]
      state.grid[coords[0]][coords[1]]  = state.grid[coords[0]][coords[1]] === 1 ? 2 : 3
      //state.value += 1;
    },
    startGrid: (state) => {
      console.log('yes')
      state.status = 'starting'
      state.grid = initializeGrid()
    },
    enableButtons: (state) => {
      console.log('yes')
      state.status = 'started'
    },
    winThermiteBossFight: (state) => {

    },

    calculateDamage: (state) => {
      state.bossHP -=  ((state.grid.flatMap(i => i).filter(i => i === 2).length * 4) - (state.grid.flatMap(i => i).filter(i => i === 3).length * 2))

      state.status = 'finished'
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //state.value += action.payload;
    },
  },
});

export const { increment,incrementByAmount, startGrid, triggerThermite, enableButtons, calculateDamage, winThermiteBossFight } = thermiteSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGrid = (state: RootState) => state.thermite.grid;
export const selectStatus = (state: RootState) => state.thermite.status;
export const selectBossHP = (state: RootState) => state.thermite.bossHP;


export default thermiteSlice.reducer;
