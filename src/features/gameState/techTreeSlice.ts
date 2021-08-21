import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';


export interface TechTreeState {
  upgradeStep: number,
  upgradeCost: number
}

const initialState: TechTreeState = {
  upgradeStep: 0,
  upgradeCost: 10
};


export const techTreeSlice = createSlice({
  name: 'techTree',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    upgrade: (state) => {
      state.upgradeStep += 1;
    },

  },
 
});

export const { upgrade } = techTreeSlice.actions;

// The function below is called a selector and allows us to select a red from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.red)`
export const selectUpgradeCost = (state: RootState) => state.techTree.upgradeCost;


export default techTreeSlice.reducer;
