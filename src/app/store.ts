import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import counterReducer from '../features/counter/counterSlice';
import gameStateReducer from '../features/gameState/gameStateSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameState: gameStateReducer
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
