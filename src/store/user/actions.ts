import { createAction, Dispatch } from '@reduxjs/toolkit';
import { StorageKey } from '../../common/enum/enums';
import {
  storage as storageService,
  auth as authService,
} from '../../services/services';
import { UserDTO } from '../../common/dtos/user/UserDTO';

const ActionType = {
  SET_USER: 'profile/set-user',
};

const setUser = createAction(ActionType.SET_USER, (user: UserDTO | null) => ({
  payload: {
    user,
  },
}));

const login =
  (request: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    const { user, token } = await authService.login(request);

    storageService.setItem(StorageKey.TOKEN, token);
    dispatch(setUser(user));
  };

const register =
  (request: { email: string; password: string; username: string }) =>
  async (dispatch: Dispatch) => {
    const { user, token } = await authService.registration(request);

    storageService.setItem(StorageKey.TOKEN, token);
    dispatch(setUser(user));
  };

const logout = () => (dispatch: Dispatch) => {
  storageService.removeItem(StorageKey.TOKEN);
  dispatch(setUser(null));
};

const loadCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    const user = await authService.getCurrentUser();

    dispatch(setUser(user));
  } catch (err) {
    logout()(dispatch);
  }
};

export { setUser, login, register, logout, loadCurrentUser };
