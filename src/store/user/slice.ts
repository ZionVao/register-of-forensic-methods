import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { RootState } from '../store';

export type UserRole = 'user' | 'registrator' | 'admin';

interface UserContent {
  user: UserDTO | null;
  role: UserRole;
}

interface UserState {
  user: UserDTO | null;
  role: UserRole;
}

const initialState: UserState = {
  user: null,
  role: 'user',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserContent>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const userActions = userSlice.actions;

export const userReduser = userSlice.reducer;
