import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import counterReducer from '../features/counter/counterSlice';
import gameStateReducer from '../features/gameState/gameStateSlice';
import cyoaStateReducer from '../features/gameState/cyoaSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameState: gameStateReducer,
    cyoaState: cyoaStateReducer

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
