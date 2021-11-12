import { Dispatch } from '@reduxjs/toolkit';
import { Filter } from '../../services/metod/metod.service';
import { metodService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { metodActions } from './slice';

export const fetchMetodsData = (filter: Filter) => (dispatch: Dispatch) => {
  metodService
    .getAllMethods(filter)
    .then((metods) => {
      dispatch(
        metodActions.replaceMetod({
          metods: metods,
          count: 100,
        }),
      );
    })
    .catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching metod data failed!',
        }),
      );
    });
};
