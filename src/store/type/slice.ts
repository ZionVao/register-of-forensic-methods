import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeDTO } from '../../common/dtos/type/TypeDTO';
import { RootState } from '../store';

interface TypeContent {
  types: TypeDTO[];
}

interface TypeState {
  types: TypeDTO[];
}

const initialState: TypeState = {
  types: [],
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypes: (state, action: PayloadAction<TypeContent>) => {
      state.types = action.payload.types;
    },
  },
});

export const loadTypes = (state: RootState) => state.type;

export const typeActions = typeSlice.actions;

export const typeReducer = typeSlice.reducer;
