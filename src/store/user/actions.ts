import { Dispatch } from '@reduxjs/toolkit';
import { StorageKey } from '../../common/enum/enums';
import {
  storage as storageService,
  auth as authService,
} from '../../services/services';
import { userActions } from './slice';
import { uiActions } from '../ui/slice';
import { UserCreateDTO } from '../../common/dtos/user/UserCreateDTO';

const login =
  (request: { email: string; password: string }) => (dispatch: Dispatch) => {
    authService
      .login(request)
      .then((res) => {
        console.log(res);

        storageService.setItem(StorageKey.TOKEN, res.token);
        //decrypt token
        const u = { role: 1, id: 1 };

        const role = u.role === 1 ? 'registrator' : 'admin';
        dispatch(userActions.setUser({ user: res.user, role: role }));
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

const register = (request: UserCreateDTO) => (dispatch: Dispatch) => {
  authService
    .registration(request)
    .then((res) => {
      storageService.setItem(StorageKey.TOKEN, res.token);
      dispatch(userActions.setUser({ user: res.user, role: 'registrator' }));
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
  dispatch(userActions.setUser({ user: null, role: 'user' }));
};

export { login, register, logout };
