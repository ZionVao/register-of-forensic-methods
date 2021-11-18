import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { RootState } from '../store';

interface MethodContent {
  methods: MethodDTO[];
  page: number;
}

interface MethodState {
  methods: MethodDTO[];
  page: number;
  count: number;
  totalPages: number;
}

const initialState: MethodState = {
  methods: [],
  page: 1,
  count: 10,
  totalPages: 1,
};

const methodSlice = createSlice({
  name: 'method',
  initialState,
  reducers: {
    replaceMethod: (state, action: PayloadAction<MethodContent>) => {
      state.methods = action.payload.methods;
      state.count = action.payload.methods.length;
      state.page = action.payload.page;
    },
    getPagesCount: (state, action: PayloadAction<{ totalCount: number }>) => {
      state.totalPages = Math.ceil(action.payload.totalCount / state.count);
    },
  },
});

export const loadMethods = (state: RootState) => state.method;

export const methodActions = methodSlice.actions;

export const methodReducer = methodSlice.reducer;
