import { configureStore } from '@reduxjs/toolkit';

import { reducer as metodReducer } from './metod/reducer';
import { reducer as userReducer } from './user/reducer';

export const store = configureStore({
  reducer: {
    metods: metodReducer,
    user: userReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
