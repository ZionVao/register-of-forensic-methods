import { Dispatch } from '@reduxjs/toolkit';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { MethodFilter } from '../../services/interfaces/interfaces';
import { methodService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { methodActions } from './slice';

export const fetchMethodsData =
  (filter: MethodFilter) => (dispatch: Dispatch) => {
    console.log(filter, 'tut');

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

export const createMethod = (form: FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await methodService.addMethod(form);
    console.log(res);

    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'New method created!',
      }),
    );
  } catch (error) {
    console.log(error);
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Creating method failed!',
      }),
    );
  }
};

export const updateMethod =
  (id: number, form: FormData) => async (dispatch: Dispatch) => {
    try {
      const res = await methodService.updateMetod(id, form);
      console.log(res);

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Method updated!',
        }),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Updating method failed!',
        }),
      );
    }
  };

export const getMethodById =
  (id: number) =>
  async (dispatch: Dispatch): Promise<MethodDTO | undefined> => {
    try {
      const res = await methodService.getMethod(id);
      return res;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching method data failed!',
        }),
      );
    }
  };
