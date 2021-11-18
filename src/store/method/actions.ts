import { Dispatch } from '@reduxjs/toolkit';
import { Filter } from '../../services/interfaces/interfaces';
import { methodService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { methodActions } from './slice';

export const fetchMethodsData = (filter: Filter) => (dispatch: Dispatch) => {
  methodService
    .getAllMethods(filter)
    .then((methods) => {
      dispatch(
        methodActions.replaceMethod({
          methods: methods,
          page: filter.page,
        }),
      );
    })
    .catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching method data failed!',
        }),
      );
    });
};

export const fetchTotalPages = () => (dispatch: Dispatch) => {
  methodService
    .getTotallCount()
    .then((totalCount: number) => {
      dispatch(methodActions.getPagesCount({ totalCount: totalCount }));
    })
    .catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching total count data failed!',
        }),
      );
    });
};
