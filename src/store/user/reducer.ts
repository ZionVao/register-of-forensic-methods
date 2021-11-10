import { createReducer } from '@reduxjs/toolkit';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { setUser } from './actions';

interface UserState {
  user: UserDTO | null;
}

const initialState: UserState = {
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    const { user } = action.payload;

    state.user = user;
  });
});

export { reducer };
