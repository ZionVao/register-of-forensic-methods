import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { RootState } from '../store';

interface MethodContent {
  methods: MethodDTO[];
  totalCount: number;
  page: number;
}

interface MethodState {
  methods: MethodDTO[];
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
}

const initialState: MethodState = {
  methods: [],
  page: 1,
  count: 10,
  totalPages: 1,
  totalCount: 0,
};

const methodSlice = createSlice({
  name: 'method',
  initialState,
  reducers: {
    replaceMethod: (state, action: PayloadAction<MethodContent>) => {
      state.methods = action.payload.methods;
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.totalPages = Math.ceil(action.payload.totalCount / state.count);
    },
  },
});

export const loadMethods = (state: RootState) => state.method;

export const methodActions = methodSlice.actions;

export const methodReducer = methodSlice.reducer;
