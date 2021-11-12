import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UiState {
  showCart: boolean;
  notification: NotificationInterface | null;
}

export interface NotificationInterface {
  status: string;
  title: string;
  message: string;
}

const initialState: UiState = {
  showCart: true,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggle: (state) => {
      state.showCart = !state.showCart;
    },
    showNotification: (state, action: PayloadAction<NotificationInterface>) => {
      state.notification = action.payload;
    },
  },
});

export const selectShowCart = (state: RootState) => state.ui.showCart;
export const selectNotification = (state: RootState) => state.ui.notification;

export const uiActions = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
