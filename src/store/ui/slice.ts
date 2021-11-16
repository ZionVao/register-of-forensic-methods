import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UiState {
  notification: NotificationInterface | null;
  currentPage: number;
}

export interface NotificationInterface {
  status: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

const initialState: UiState = {
  notification: null,
  currentPage: 1,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationInterface>) => {
      state.notification = action.payload;
    },
    clearNotification: (state, action: PayloadAction<void>) => {
      console.log('act');

      state.notification = null;
    },
  },
});

export const selectNotification = (state: RootState) => state.ui.notification;

export const uiActions = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
