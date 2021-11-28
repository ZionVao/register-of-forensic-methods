import { Dispatch } from '@reduxjs/toolkit';
import { StorageKey } from '../../common/enum/enums';
import {
  storage as storageService,
  userService,
} from '../../services/services';
import { userActions, UserRole } from './slice';
import { uiActions } from '../ui/slice';

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

const refreshToken = () => async (dispatch: Dispatch) => {
  try {
    const res = await userService.token();
    console.log(res);
    storageService.setItem(StorageKey.TOKEN, res.Token);
    if (storageService.getItem(StorageKey.TOKEN)) {
      setTimeout(() => {
        if (storageService.getItem(StorageKey.REFRESH_TOKEN)) {
          refreshToken()(dispatch);
        }
      }, 600000);
    }
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Token Refreshed!',
      }),
    );
  } catch (error) {
    console.log(error);

    localStorage.clear();
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Failed Refresh Token!',
      }),
    );
  }
};

const login =
  (request: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await userService.login(request);
      console.log(res);
      storageService.setItem(StorageKey.TOKEN, res.Token);

      const user = await userService.getUserByToken();
      storageService.setItem(StorageKey.USER, JSON.stringify(user));

      storageService.setItem(
        StorageKey.REFRESH_TOKEN,
        StorageKey.REFRESH_TOKEN,
      );

      // userService.setRefreshToken(
      // refreshToken()(dispatch)

      dispatch(
        userActions.setUser({ user: user, role: getUserRole(user.id_role) }),
      );
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: `Користувач ${user.full_name} увійшов`,
        }),
      );
    } catch (error) {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Failed Login!',
        }),
      );
    }
  };

const logout = () => (dispatch: Dispatch) => {
  storageService.removeItem(StorageKey.TOKEN);
  storageService.removeItem(StorageKey.USER);
  dispatch(userActions.setUser({ user: null, role: 'user' }));
  dispatch(
    uiActions.showNotification({
      status: 'info',
      title: 'Logout',
      message: 'User logged out',
    }),
  );
};

const sendUserInfo = (id: number) => (dispatch: Dispatch) => {
  userService
    .sendDataUser(id)
    .then((res) =>
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: `Дані успішно надіслані на пошту ${res.email}`,
        }),
      ),
    )
    .catch((error) => {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Failed Send User Data!',
        }),
      );
    });
};

const deleteUser = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await userService.deleteUserById(id);
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Реєстратора успішно видалено',
      }),
    );
  } catch (error) {
    console.log(error);

    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Failed Delete Registrar!',
      }),
    );
  }
};

export { login, logout, sendUserInfo, deleteUser };
