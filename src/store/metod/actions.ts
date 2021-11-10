import { createAction } from '@reduxjs/toolkit';
import { Dispatch } from '@reduxjs/toolkit';
import { MetodDTO } from '../../common/dtos/metod/MetodDTO';
import { Filter } from '../../services/metod/metod.service';
import { metodService } from '../../services/services';

const ActionType = {
  SET_METODS: 'table/set-metods',
};

const setMetods = createAction(ActionType.SET_METODS, (metods: MetodDTO[]) => ({
  payload: {
    metods,
  },
}));

const loadMetods = (filter: Filter) => {
  return async (dispatch: Dispatch) => {
    const posts = await metodService.getAllMethods(filter);
    dispatch(setMetods(posts));
  };
};

export { setMetods, loadMetods };
