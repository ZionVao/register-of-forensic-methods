import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressDTO } from '../../common/dtos/address/AddressDTO';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { RootState } from '../store';

interface IOrganizations {
  [id: string | number]: {
    name: string;
  };
}

interface IAddresses {
  [id: string | number]: Omit<AddressDTO, 'id'>;
}

interface IAuthorities {
  [id: string | number]: {
    code: number;
    id_adress: number;
    name: string;
  };
}

interface RegistrarContent {
  registrars: UserDTO[];
  totalCount: number;
  page: number;
}
interface IPosition {
  [id: string | number]: {
    name: string;
  };
}

interface RegistrarState {
  registrars: UserDTO[];
  organizations: IOrganizations;
  addresses: IAddresses;
  authorities: IAuthorities;
  position: IPosition;
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
}

const initialState: RegistrarState = {
  registrars: [],
  organizations: {},
  addresses: {},
  authorities: {},
  position: {},
  page: 1,
  count: 10,
  totalPages: 1,
  totalCount: 0,
};

const registorSlice = createSlice({
  name: 'registrar',
  initialState,
  reducers: {
    getRegistors: (state, action: PayloadAction<RegistrarContent>) => {
      state.registrars = action.payload.registrars;
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.totalPages = Math.ceil(action.payload.totalCount / state.count);
    },
    getRelations: (
      state,
      action: PayloadAction<{
        organizations: IOrganizations;
        addresses: IAddresses;
        authorities: IAuthorities;
        position: IPosition;
      }>,
    ) => {
      state.organizations = action.payload.organizations;
      state.addresses = action.payload.addresses;
      state.authorities = action.payload.authorities;
      state.position = action.payload.position;
    },

    setStateActivation: (
      state,
      action: PayloadAction<{ id: number; isActive: boolean }>,
    ) => {
      state.registrars = state.registrars.reduce(
        (prev: UserDTO[], curr: UserDTO) => {
          if (curr.id === action.payload.id)
            return [...prev, { ...curr, is_activate: action.payload.isActive }];
          else return [...prev, curr];
        },
        [],
      );
    },
  },
});

export const loadRegistrars = (state: RootState) => state.registrar;

export const registrarActions = registorSlice.actions;

export const registrarReducer = registorSlice.reducer;
