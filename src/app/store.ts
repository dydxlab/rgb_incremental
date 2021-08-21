import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import counter1Reducer from '../features/gameState/counterSlice';
import techTreeReducer from '../features/gameState/techTreeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter1: counter1Reducer,
    techTree: techTreeReducer
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
