import { createReducer } from '@reduxjs/toolkit';
import { setMetods } from './actions';
import { MetodDTO } from '../../common/dtos/metod/MetodDTO';

interface MetodContent {
  metods: MetodDTO[];
  hasMoreMetods: Boolean;
}

const initialState: MetodContent = {
  metods: [],
  hasMoreMetods: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setMetods, (state, action) => {
    const { metods } = action.payload;

    state.metods = metods;
    state.hasMoreMetods = Boolean(metods.length);
  });
});

export { reducer };
