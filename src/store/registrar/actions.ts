import { Dispatch } from '@reduxjs/toolkit';
import { UserFilter } from '../../services/interfaces/interfaces';
import { userService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { registrarActions } from './slice';
import { AddressDTO } from '../../common/dtos/address/AddressDTO';
import { UserCreateDTO } from '../../common/dtos/user/UserCreateDTO';

export const fetchRegistrarsData =
  (filter: UserFilter) => (dispatch: Dispatch) => {
    userService
      .getUsers(filter)
      .then((users) => {
        dispatch(
          registrarActions.getRegistors({
            registrars: users.users,
            totalCount: users.count,
            page: filter.page,
          }),
        );
      })
      .catch((error) =>
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching user data failed!',
          }),
        ),
      );
  };

export const fetchUsersRelations = () => async (dispatch: Dispatch) => {
  Promise.all([
    userService.getOrganizations(),
    userService.getAddresses(),
    userService.getAuthorities(),
  ])
    .then((values) => {
      const organizations = values[0].reduce(
        (
          acc: { [id: string | number]: { name: string } },
          obj: { id: number; name: string },
        ) => {
          acc[obj.id] = {
            name: obj.name,
          };
          return acc;
        },
        {},
      );
      console.log(organizations, 'organizations');

      const addresses = values[1].reduce(
        (
          acc: { [id: string | number]: Omit<AddressDTO, 'id'> },
          obj: AddressDTO,
        ) => {
          acc[obj.id] = {
            city: obj.city,
            flat_number: obj.flat_number || null,
            house_number: obj.house_number,
            region: obj.region,
            street: obj.street,
          };
          return acc;
        },
        {},
      );
      const authorities = values[2].reduce(
        (
          acc: {
            [id: string | number]: {
              code: number;
              id_adress: number;
              name: string;
            };
          },
          obj: { id: number; code: number; id_adress: number; name: string },
        ) => {
          acc[obj.id] = {
            code: obj.code,
            id_adress: obj.id_adress,
            name: obj.name,
          };
          return acc;
        },
        {},
      );
      console.log(authorities, 'authorities');

      dispatch(
        registrarActions.getRelations({
          organizations: organizations,
          authorities: authorities,
          addresses: addresses,
        }),
      );
    })
    .catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching registats relations failed!',
        }),
      );
    });
};

export const createUser =
  (user: UserCreateDTO) => async (dispatch: Dispatch) => {
    try {
      const res = await userService.postUser(user);
      console.log(res);

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'New user created!',
        }),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Creating user failed!',
        }),
      );
    }
  };
