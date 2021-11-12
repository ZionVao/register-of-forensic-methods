import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { RootState } from '../store';

interface UserContent {
  user: UserDTO | null;
}

interface UserState {
  user: UserDTO | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserContent>) => {
      state.user = action.payload.user;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const userActions = userSlice.actions;

export const userReduser = userSlice.reducer;
