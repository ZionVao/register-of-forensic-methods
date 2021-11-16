import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { RootState } from '../store';

interface UserContent {
  user: UserDTO | null;
  role: 'user' | 'registrator' | 'admin';
}

interface UserState {
  user: UserDTO | null;
  role: 'user' | 'registrator' | 'admin';
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
