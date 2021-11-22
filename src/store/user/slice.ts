import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { RootState } from '../store';
import { storage as storageService } from '../../services/services';
import { StorageKey } from '../../common/enum/enums';

export type UserRole = 'user' | 'registrator' | 'admin';

interface UserContent {
  user: UserDTO | null;
  role: UserRole;
}

interface UserState {
  user: UserDTO | null;
  role: UserRole;
}

const getUserRole = (id: number): UserRole => {
  switch (id) {
    case 1:
      return 'registrator';
    case 2:
      return 'admin';
    default:
      return 'user';
  }
};

const getInitialState = (): UserState => {
  const user: UserDTO | null = JSON.parse(
    storageService.getItem(StorageKey.USER) || 'null',
  );
  if (user === null) {
    return {
      user: null,
      role: 'user',
    };
  } else {
    return { user: user, role: getUserRole(user.id_role) };
  }
};

const initialState: UserState = getInitialState();

// const initialState: UserState = {
//   user: null,
//   role: 'user',
// };

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
