import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';

const currentVersion = '0.2'

interface GridParams {
  gridLength: number;
  coordChoices: Array<Array<number>>;
  choiceCount: number;
  grid: Array<Array<CellStatus>>;
  gridChoices: Array<Array<number>>;
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
  complete: boolean;
}
export type CellStatus = 'GreenActive' | 'BlueActive' | 'RedActive' | 'OrangeActive' | 'GreenInactive' | 'BlueInactive' | 'RedInactive' | 'OrangeInactive' |
  'GreenActiveHighlighted' | 'BlueActiveHighlighted' | 'RedActiveHighlighted' | 'OrangeActiveHighlighted' | 'GreenInactiveHighlighted' | 'BlueInactiveHighlighted' | 'RedInactiveHighlighted' | 'OrangeInactiveHighlighted' |
  'Neutral' | 'GoldInactive' | 'GoldActive'
export const activeCellStatuses: Array<CellStatus> = ['GreenActive', 'BlueActive', 'RedActive', 'OrangeActive', 'GoldActive']

let fiveStreak: Achievement = { streak: 5, title: "Five Win Streak", description: "Unprecedented success!", complete: false}
let tenStreak: Achievement = { streak: 10, title: "Ten Win Streak", description: "Unprecedented success!", complete: false }
let tenTotal: Achievement = { perfectScores: 10, title: "Ten Wins!", description: "Unprecedented success!", complete: false }
let hundredTotal: Achievement = { perfectScores: 100, title: "One Hundred Wins", description: "Unprecedented success!", complete: false }

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
  version: string;
}



let threeByThreeGrid: GridParams = {
  gridLength: 3,
  choiceCount: 3,
  coordChoices: [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [1, 1], [2, 1], [1, 2], [2, 2]],
  grid: [['Neutral']],
  gridChoices: choose([...Array([[0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [1, 1], [2, 1], [1, 2], [2, 2]].length).keys()], 3)
}
let fourByFourGrid: GridParams = {
  gridLength: 4,
  choiceCount: 4,
  coordChoices: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3],],
  grid: [['Neutral']],
  gridChoices: choose([...Array([[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3],].length).keys()], 4)
}
let fiveByFiveGrid: GridParams = {
  gridLength: 5,
  choiceCount: 5,
  coordChoices: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [1, 4], [2, 4], [3, 4], [4, 3], [4, 4],],
  grid: [['Neutral']],
  gridChoices: choose([...Array([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [1, 4], [2, 4], [3, 4], [4, 3], [4, 4],].length).keys()], 5)
}

let allParams = {
  3: threeByThreeGrid,
  4: fourByFourGrid,
  5: fiveByFiveGrid
}

const initialState: FarmingState = {
  //grid: [[0, 0], [1, 0]],
  grid: initializeGrid(threeByThreeGrid, false),
  status: 'idle',
  score: 0,
  maxScore: 20,
  maxScoreCoords: [[0]],
  enabled: false,
  achievementStats: { perfectScores: 0, streak: 0 },
  achievements: [fiveStreak, tenStreak, tenTotal, hundredTotal],
  freshAchievements: new Array<Achievement>(),
  version: '0.1'
};

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function emptyGrid(gridParams: GridParams): GridParams {
  let n = gridParams.gridLength
  let randomGrid: Array<Array<CellStatus>> = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => 'Neutral'))
  gridParams.grid = randomGrid
  return gridParams
}

function initializeGrid(gridParams: GridParams, showGolden: boolean): GridParams {
  let n = gridParams.gridLength
  let lookup = {1: 'GreenInactive', 2: 'BlueInactive', 3:'RedInactive'}
  gridParams.grid = [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => lookup[getRandomIntInclusive(1, 3)]))
  if(showGolden && Math.random() >0.99) {
    gridParams.grid[getRandomIntInclusive(0, gridParams.gridLength - 1)][getRandomIntInclusive(0, gridParams.gridLength - 1)] = 'GoldInactive'
  }
  return gridParams
}
export interface BruteforceSolution {
  coords: Array<Array<number>>;
  maxScore: number;
}


function choose(arr, k, prefix: Array<number> = []) {
  if (k == 0) return [prefix];
  return arr.flatMap((v, i) =>
    choose(arr.slice(i + 1), k - 1, [...prefix, v])
  );
}



function bruteForce(grid: GridParams): BruteforceSolution {
  //let coordChoices = {1: [0,0], 2: [0,1], 3: [0,2], 4: [1,0], 5:[2,0], 6:[1,1], 7:[2,1],8:[1,2], 9:[2,2]}
  let coordChoices = grid.coordChoices
  let gridCopy1 = deactivateGridCellStatus(JSON.parse(JSON.stringify(grid.grid)))
  let curr: Array<BruteforceSolution> = []
  let choices = grid.gridChoices
  let maxCoord = [[0]]
  let maxScore = 0
  for (const choice of choices) {
    let gridCopy = deactivateGridCellStatus(gridCopy1)
    choice.flatMap(x => activateGridCoords(gridCopy, coordChoices[x]))
    let score = calculateScore(gridCopy)
    let coords1 = choice.map(x => coordChoices[x])
    curr.push({ coords: coords1, maxScore: score })
    if (score > maxScore) {
      maxCoord = coords1
      maxScore = score
    }
  }

  return { coords: maxCoord, maxScore: maxScore }
}

function calculateScore(grid: Array<Array<CellStatus>>) {
  let score = 0;
  let baseScores = { 'GreenActive': 4, 'BlueActive': 0, 'RedActive': 1, 'GoldActive': 10, 'OrangeActive': 2 }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let base = baseScores[grid[i][j]] ?? -1
      if (base === -1) {
        continue;
      }
      if ((i - 1 >= 0 && grid[i - 1][j] === 'BlueActive') || (i + 1 < grid.length && grid[i + 1][j] === 'BlueActive')) {
        base = base + 3
      }
      if ((i - 1 >= 0 && j - 1 >= 0 && grid[i - 1][j - 1] === 'RedActive')
        || (i - 1 >= 0 && j + 1 <= grid[0].length && grid[i - 1][j + 1] === 'RedActive')
        || (i + 1 < grid.length && j - 1 >= 0 && grid[i + 1][j - 1] === 'RedActive')
        || (i + 1 < grid.length && j + 1 < grid[0].length && grid[i + 1][j + 1] === 'RedActive')) {
        base = base + 2
      }
      
      if ((j - 1 >= 0 && grid[i][j - 1] === 'GreenActive') || (j + 1 < grid[0].length && grid[i][j + 1] === 'GreenActive')) {
        base = 0
      }
      score = score + base
    }
  }

  return score;
}

function activateGridCoords(grid, coords) {
  grid[coords[0]][coords[1]] = activateCellStatus(grid[coords[0]][coords[1]])
  return grid
}

function activateCellStatus(cellStatus: CellStatus) {
  switch (cellStatus) {
    case 'GreenActive': return 'GreenInactive'
    case 'GreenInactive': return 'GreenActive'
    case 'RedActive': return 'RedInactive'
    case 'RedInactive': return 'RedActive'
    case 'BlueActive': return 'BlueInactive'
    case 'BlueInactive': return 'BlueActive'
  }

}

function deactivateGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      switch (grid[i][j]) {
        case '4': grid[i][j] = 1; break;
        case 5: grid[i][j] = 2; break;
        case 6: grid[i][j] = 3; break;
        default: break;
      }
    }
  }

  return grid
}

function deactivateGridCellStatus(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      switch (grid[i][j]) {
        case 'GreenActive': grid[i][j] = 'GreenInactive'; break;
        case 'RedActive': grid[i][j] = 'RedInactive'; break;
        case 'BlueActive': grid[i][j] = 'BlueInactive'; break;
        default: break;
      }
    }
  }

  return grid
}

function highlightCellStatus(cell: CellStatus): CellStatus {
  switch (cell) {
    case 'GreenActive': return 'GreenActiveHighlighted';
    case 'RedActive': return 'RedActiveHighlighted'; 
    case 'BlueActive': return 'BlueActiveHighlighted'; 
    case 'GreenInactive': return 'GreenInactiveHighlighted'; 
    case 'RedInactive': return 'RedInactiveHighlighted'; 
    case 'BlueInactive': return 'BlueInactiveHighlighted'; 
    default: return 'Neutral'
  }

}

export const farmingSlice = createSlice({
  name: 'farming',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    activateCell: (state, action) => {
      state.freshAchievements = []
      let coords = action.payload;
      //let coords = [0,2]
      state.grid.grid = activateGridCoords(state.grid.grid, coords)
      if (state.grid.grid.flatMap(x => x).filter(x => activeCellStatuses.includes(x)).length === state.grid.choiceCount) {
        state.status = 'finished'
        state.score = calculateScore(state.grid.grid)
        if (state.score === state.maxScore) {
          state.grid.grid = state.grid.grid.map(x => x.map(y => activeCellStatuses.includes(y) ? highlightCellStatus(y) : y))
          state.achievementStats.perfectScores += 1
          state.achievementStats.streak += 1
          state.freshAchievements = state.freshAchievements.concat(state.achievements.filter(x => !x.complete && x.perfectScores === state.achievementStats.perfectScores))
          state.freshAchievements = state.freshAchievements.concat(state.achievements.filter(x => !x.complete && x.perfectScores === state.achievementStats.perfectScores))
          state.freshAchievements = state.freshAchievements.concat(state.achievements.filter(x => !x.complete && x.streak === state.achievementStats.streak))
          state.achievements.filter(x => !x.complete && x.streak === state.achievementStats.streak).flatMap(x => x.complete = true)
          state.achievements.filter(x => !x.complete && x.perfectScores === state.achievementStats.perfectScores).flatMap(x => x.complete = true)

        } else {
          for (const coord of current(state.maxScoreCoords)) {
            state.grid.grid[coord[0]][coord[1]] = highlightCellStatus(state.grid.grid[coord[0]][coord[1]])
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
      state.grid = initializeGrid(state.grid,state.achievementStats.perfectScores > 0)
      let bruteForceSolution = bruteForce(state.grid)
      state.maxScore = bruteForceSolution.maxScore
      state.maxScoreCoords = bruteForceSolution.coords
    },
    enableButtons: (state) => {
      state.status = 'started'
    },

  },
});

export const { startGrid, activateCell, enableButtons, setGridSize } = farmingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGrid = (state: RootState) => state.farming.grid.grid;
export const selectGridSize = (state: RootState) => state.farming.grid.gridLength;
export const selectStatus = (state: RootState) => state.farming.status;
export const selectScore = (state: RootState) => state.farming.score;
export const selectMaxScore = (state: RootState) => state.farming.maxScore;
export const selectFreshAchievements = (state: RootState) => state.farming.freshAchievements;


export default farmingSlice.reducer;
