import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';

export interface FarmingState {
  grid: Array<Array<number>>;
  status: 'idle' | 'starting' | 'started' | 'finished';
  score: number;
  maxScore: number;
  enabled: boolean;
}

const initialState: FarmingState = {
  //grid: [[0, 0], [1, 0]],
  grid: initializeGrid(),
  status: 'idle',
  score: 0,
  maxScore: 20,
  enabled: false
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function initializeGrid(){
  let n = 3
  let randomGrid = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => getRandomIntInclusive(1,3)))
  return randomGrid
}

function bruteForce(grid){
  let coordChoices = {1: [0,0], 2: [0,1], 3: [0,2], 4: [1,0], 5:[2,0], 6:[1,1], 7:[2,1],8:[1,2], 9:[2,2]}
  let curr = {}
  let scores = [0]
  for(let i = 1; i <= 9; i++){
    for(let j = i+1; j <= 9; j++){
      for(let k = j+1; k <= 9; k++){
        let gridCopy = Object.assign(grid, {})
        activateGridCoords(gridCopy, coordChoices[i])
        activateGridCoords(gridCopy, coordChoices[j])
        activateGridCoords(gridCopy, coordChoices[k])
        let score = calculateScore(grid)
        curr[coordChoices[i] + ',' + coordChoices[j] + ',' + coordChoices[k]] = score
        scores.push(score)
      }
    }
  }
  return Math.max(...scores)
}

function calculateScore(grid){
  let score = 0;
  let baseScores = {4: 3, 5: 2, 6: 1}


  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[0].length; j++){
      let base = baseScores[grid[i][j]] || 0
      if(base === 0){
        continue;
      }
      if((i - 1 >= 0 && grid[i - 1][j] === 5) || (i + 1 < grid.length && grid[i + 1][j] === 5)){
        base = base + 1
      }
      if((i - 1 >= 0 && j - 1 >= 0 && grid[i - 1][j- 1] === 6 )  
      || (i - 1 >= 0 && j + 1 <= grid[0].length && grid[i - 1][j + 1] === 6 )  
      || (i + 1 < grid.length && j - 1 >= 0 && grid[i + 1][j - 1] === 6 )  
      || (i + 1 < grid.length && j + 1 < grid[0].length && grid[i + 1][j + 1] === 6)){
        base = base + 1
      }
      if((j - 1 >= 0 && grid[i][j - 1] === 4) || (j + 1 < grid[0].length && grid[i][j + 1] === 4)){
        base = 0
      }
      score = score + base
    }
  }

  return score;
}

function activateGridCoords(grid, coords){
  switch(grid[coords[0]][coords[1]]) {
    case 1: grid[coords[0]][coords[1]] = 4; break;
    case 2: grid[coords[0]][coords[1]] = 5; break;
    case 3: grid[coords[0]][coords[1]] = 6; break;
    case 4: grid[coords[0]][coords[1]] = 1; break;
    case 5: grid[coords[0]][coords[1]] = 2; break;
    case 6: grid[coords[0]][coords[1]] = 3; break;
  }
  return grid
}


export const farmingSlice = createSlice({
  name: 'farming',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {

      //state.value += 1;
    },
    activateCell: (state, action) => {
      let coords = action.payload;
      console.log(coords)
      //let coords = [0,2]
      state.grid = activateGridCoords(state.grid, coords)
      console.log('test')
      if(state.grid.flatMap(x => x).filter(x => x >= 4 && x <=6).length === 3){
        state.status = 'finished'
        state.score = calculateScore(state.grid)
        state.maxScore = bruteForce(state.grid)
      }
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

  },
});

export const {startGrid, activateCell, enableButtons, } = farmingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGrid = (state: RootState) => state.farming.grid
export const selectStatus = (state: RootState) => state.farming.status;
export const selectScore = (state: RootState) => state.farming.score;
export const selectMaxScore = (state: RootState) => state.farming.maxScore;


export default farmingSlice.reducer;
