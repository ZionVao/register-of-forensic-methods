import { Dispatch } from '@reduxjs/toolkit';
import { StorageKey } from '../../common/enum/enums';
import {
  storage as storageService,
  auth as authService,
} from '../../services/services';
import { userActions } from './slice';
import { uiActions } from '../ui/slice';

const login =
  (request: { email: string; password: string }) => (dispatch: Dispatch) => {
    authService
      .login(request)
      .then((res) => {
        storageService.setItem(StorageKey.TOKEN, res.token);
        dispatch(userActions.setUser({ user: res.user }));
      })
      .catch(() => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Failed Login!',
          }),
        );
      });
  };

const register =
  (request: { email: string; password: string; username: string }) =>
  (dispatch: Dispatch) => {
    authService
      .registration(request)
      .then((res) => {
        storageService.setItem(StorageKey.TOKEN, res.token);
        dispatch(userActions.setUser({ user: res.user }));
      })
      .catch(() => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Failed Register!',
          }),
        );
      });
  };

const logout = () => (dispatch: Dispatch) => {
  storageService.removeItem(StorageKey.TOKEN);
  dispatch(userActions.setUser({ user: null }));
};

export { login, register, logout };
