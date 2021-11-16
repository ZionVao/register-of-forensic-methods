import { Dispatch } from '@reduxjs/toolkit';
import { uiActions } from '../ui/slice';

export const cleanNotification = () => (dispatch: Dispatch) => {
  console.log('dsfds');

  return dispatch(uiActions.clearNotification());
};
