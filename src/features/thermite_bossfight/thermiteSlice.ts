import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ThermiteState {
  grid: Array<Array<number>>;
  status: 'idle' | 'starting' | 'started' | 'finished';
  enabled: boolean;
}
let n = 4
let randomGrid = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => Math.round(Math.random())))
console.log(randomGrid)
const initialState: ThermiteState = {
  //grid: [[0, 0], [1, 0]],
  grid: randomGrid,
  status: 'idle',
  enabled: false
};


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
    },
    enableButtons: (state) => {
      console.log('yes')
      state.status = 'started'
    },

    calculateDamage: (state) => {
      
      state.status = 'finished'
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //state.value += action.payload;
    },
  },
});

export const { increment,incrementByAmount, startGrid, triggerThermite, enableButtons, calculateDamage } = thermiteSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGrid = (state: RootState) => state.thermite.grid;
export const selectStatus = (state: RootState) => state.thermite.status;


export default thermiteSlice.reducer;
