import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';
import { RootState } from '../store';

interface TransactionContent {
  transactions: TransactionDTO[];
  totalCount: number;
  page: number;
}

interface TransactionState {
  transactions: TransactionDTO[];
  totalCount: number;
  count: number;
  page: number;
  totalPages: number;
}

const initialState: TransactionState = {
  transactions: [],
  totalCount: 0,
  count: 10,
  page: 1,
  totalPages: 1,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    replaceTransaction: (state, action: PayloadAction<TransactionContent>) => {
      state.transactions = action.payload.transactions;
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.totalPages = Math.ceil(action.payload.totalCount / state.count);
    },
  },
});

export const loadTransactios = (state: RootState) => state.transaction;

export const transactionActions = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;
