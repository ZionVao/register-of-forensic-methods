import { Dispatch } from '@reduxjs/toolkit';
import { MethodFilter } from '../../services/interfaces/interfaces';
import { methodService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { methodActions } from './slice';

export const fetchMethodsData =
  (filter: MethodFilter) => (dispatch: Dispatch) => {
    methodService
      .getAllMethods(filter)
      .then((methods) => {
        dispatch(
          methodActions.replaceMethod({
            methods: methods.methods,
            totalCount: methods.count,
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
