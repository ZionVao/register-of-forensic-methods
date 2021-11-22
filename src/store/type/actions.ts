import { Dispatch } from '@reduxjs/toolkit';
import { typeService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { typeActions } from './slice';

export const fetchTypesData = () => (dispatch: Dispatch) => {
  typeService
    .getAllTypes()
    .then((types) => {
      dispatch(typeActions.setTypes({ types: types }));
    })
    .catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching type data failed!',
        }),
      );
    });
};
