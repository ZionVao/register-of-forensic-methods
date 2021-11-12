import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetodDTO } from '../../common/dtos/metod/MetodDTO';
import { RootState } from '../store';

interface MetodContent {
  metods: MetodDTO[];
  count: number;
}

interface MetodState {
  metods: MetodDTO[];
  hasMoreMetods: Boolean;
  count: number;
}

const initialState: MetodState = {
  metods: [],
  hasMoreMetods: false,
  count: 0,
};

const metodSlice = createSlice({
  name: 'metod',
  initialState,
  reducers: {
    replaceMetod: (state, action: PayloadAction<MetodContent>) => {
      state.metods = action.payload.metods;
      state.hasMoreMetods = Boolean(state.metods.length);
      state.count = action.payload.count;
    },
  },
});

export const loadMetods = (state: RootState) => state.metods;

export const metodActions = metodSlice.actions;

export const metodReducer = metodSlice.reducer;
