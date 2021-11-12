import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { metodReducer } from './metod/slice';

import { uiReducer } from './ui/slice';
import { userReduser } from './user/slice';

export const store = configureStore({
  reducer: {
    metods: metodReducer,
    user: userReduser,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
