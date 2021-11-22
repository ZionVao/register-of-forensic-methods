import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { methodReducer } from './method/slice';
import { registrarReducer } from './registrar/slice';
import { transactionReducer } from './transaction/slice';
import { typeReducer } from './type/slice';
// import { sessionReducer } from 'redux-react-session';

import { uiReducer } from './ui/slice';
import { userReduser } from './user/slice';

export const store = configureStore({
  reducer: {
    method: methodReducer,
    user: userReduser,
    ui: uiReducer,
    type: typeReducer,
    // session: sessionReducer,
    registrar: registrarReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
