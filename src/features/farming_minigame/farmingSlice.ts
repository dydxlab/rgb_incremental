import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';

interface GridParams {
  gridLength: number;
  coordChoices: Array<Array<number>>;
  choiceCount: number;
  grid: Array<Array<number>>
}

interface AchievementStats {
  perfectScores: number;
  streak: number;
}

interface Achievement {
  perfectScores?: number;
  streak?: number;
  title: string;
  description: string;
}

let fiveStreak: Achievement = {streak: 5, title: "Five Win Streak", description: "Unprecedented success!"}
let tenStreak: Achievement = {streak: 5, title: "Ten Win Streak", description: "Unprecedented success!"}
let tenTotal: Achievement = {streak: 5, title: "Ten Wins!", description: "Unprecedented success!"}
let hundredTotal: Achievement = {streak: 5, title: "One Hundred Wins", description: "Unprecedented success!"}

export interface FarmingState {
  grid: GridParams;
  status: 'idle' | 'starting' | 'started' | 'finished';
  score: number;
  maxScore: number;
  maxScoreCoords: Array<Array<number>>;
  enabled: boolean;
  achievementStats: AchievementStats;
  achievements: Array<Achievement>;
  freshAchievements: Array<Achievement>;
}



let threeByThreeGrid: GridParams = {
  gridLength: 3,
  choiceCount: 3,
  coordChoices: [[0,0], [0,1], [0,2], [1,0],[2,0],[1,1], [2,1],[1,2],[2,2]],
  grid: [[0]]
}
let fourByFourGrid: GridParams = {
  gridLength: 4,
  choiceCount: 4,
  coordChoices: [[0,0], [0,1], [0,2], [0,3], [1,0],[2,0], [3,0], [1,1], [2,1], [3,1], [1,2],[2,2], [3,2], [1,3], [2,3], [3,3],],
  grid: [[0]]
}
let fiveByFiveGrid: GridParams = {
  gridLength: 5,
  choiceCount: 5,
  coordChoices: [[0,0], [0,1], [0,2], [0,3], [0,4], [1,0],[2,0], [3,0], [4,0], [1,1], [2,1], [3,1], [4,1], [1,2],[2,2], [3,2], [4,2], [1,3], [2,3], [3,3], [1,4], [2,4], [3,4], [4,3], [4,4],],
  grid: [[0]]
}

let allParams = {
  3: threeByThreeGrid,
  4: fourByFourGrid,
  5: fiveByFiveGrid
}

const initialState: FarmingState = {
  //grid: [[0, 0], [1, 0]],
  grid: initializeGrid(fiveByFiveGrid),
  status: 'idle',
  score: 0,
  maxScore: 20,
  maxScoreCoords: [[0]],
  enabled: false,
  achievementStats: {perfectScores: 0, streak: 0},
  achievements: new Array<Achievement>(),
  freshAchievements: new Array<Achievement>()
};

function getRandomIntInclusive(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function emptyGrid(gridParams: GridParams): GridParams{
  let n = gridParams.gridLength
  let randomGrid = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => 0))
  gridParams.grid = randomGrid
  return gridParams
}

function initializeGrid(gridParams: GridParams): GridParams{
  let n = gridParams.gridLength
  let randomGrid = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => getRandomIntInclusive(1,3)))
  gridParams.grid = randomGrid
  return gridParams
}
export interface BruteforceSolution {
  coords: Array<Array<number>>;
  maxScore: number;
}


function choose(arr, k, prefix: Array<number> =[]) {
  if (k == 0) return [prefix];
  return arr.flatMap((v, i) =>
      choose(arr.slice(i+1), k-1, [...prefix, v])
  );
}



function bruteForce(grid: GridParams): BruteforceSolution{
  //let coordChoices = {1: [0,0], 2: [0,1], 3: [0,2], 4: [1,0], 5:[2,0], 6:[1,1], 7:[2,1],8:[1,2], 9:[2,2]}
  let coordChoices = grid.coordChoices
  let gridCopy1 = deactivateGrid(JSON.parse(JSON.stringify(grid.grid)))
  let curr: Array<BruteforceSolution> = []
  let choices = choose([...Array(grid.coordChoices.length).keys()], grid.choiceCount)
  for (const choice of choices){
    let gridCopy =JSON.parse(JSON.stringify(gridCopy1))
    choice.flatMap(x => activateGridCoords(gridCopy, coordChoices[x]))
    let score = calculateScore(gridCopy)
    let coords1 = choice.map(x => coordChoices[x])
    curr.push({coords:coords1, maxScore:score})
  }
  let maxCoord = [[0]]
  let maxScore = 0
  for(let x of curr){
    if(x.maxScore > maxScore){
      maxCoord = x.coords
      maxScore = x.maxScore
    }
  }

  return {coords: maxCoord, maxScore: maxScore}
}

function calculateScore(grid: Array<Array<number>>){
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

function deactivateGrid(grid){
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[0].length; j++){
      switch(grid[i][j]) {
        case 4: grid[i][j] = 1; break;
        case 5: grid[i][j] = 2; break;
        case 6: grid[i][j] = 3; break;
        default: break;
      }
    }
  }
  
  return grid
}

export const farmingSlice = createSlice({
  name: 'farming',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    activateCell: (state, action) => {
      let coords = action.payload;
      console.log(coords)
      //let coords = [0,2]
      state.grid.grid = activateGridCoords(state.grid.grid, coords)
      console.log('test')
      if(state.grid.grid.flatMap(x => x).filter(x => x >= 4 && x <=6).length === state.grid.choiceCount){
        state.status = 'finished'
        state.score = calculateScore(state.grid.grid)
        if(state.score === state.maxScore){
          state.grid.grid = state.grid.grid.map(x => x.map(y => y > 3 ? y + 6 : y))
          state.achievementStats.perfectScores += 1
          state.achievementStats.streak += 1
          
        } else {
          for(const coord of current(state.maxScoreCoords)){
            console.log(coord)
            console.log(current(state.grid))
            console.log(current(state.maxScoreCoords))
            state.grid.grid[coord[0]][coord[1]] += 6
          }
          state.achievementStats.streak = 0
        }
        

      }
      //state.value += 1;
    },
    setGridSize: (state, action) => {
      state.grid = emptyGrid(JSON.parse(JSON.stringify(allParams[action.payload])))
    },
    startGrid: (state) => {
      state.status = 'starting'
      state.grid = initializeGrid(state.grid)
      let bruteForceSolution = bruteForce(state.grid)
      state.maxScore = bruteForceSolution.maxScore
      state.maxScoreCoords = bruteForceSolution.coords
    },
    enableButtons: (state) => {
      console.log('yes')
      state.status = 'started'
    },

  },
});

export const {startGrid, activateCell, enableButtons, setGridSize } = farmingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGrid = (state: RootState) => state.farming.grid.grid;
export const selectGridSize = (state: RootState) => state.farming.grid.gridLength;
export const selectStatus = (state: RootState) => state.farming.status;
export const selectScore = (state: RootState) => state.farming.score;
export const selectMaxScore = (state: RootState) => state.farming.maxScore;


export default farmingSlice.reducer;
