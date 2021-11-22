import { Dispatch } from '@reduxjs/toolkit';
import { uiActions } from '../ui/slice';

export const cleanNotification = () => (dispatch: Dispatch) => {
  return dispatch(uiActions.clearNotification());
};
