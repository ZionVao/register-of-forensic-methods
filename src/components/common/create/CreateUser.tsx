import { Box, Button, Grid, Paper, Stack, TextField } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from 'react';
import {
  createUser,
  fetchUsersRelations,
} from '../../../store/registrar/actions';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { loadRegistrars } from '../../../store/registrar/slice';
import { getDateStr } from '../../../helpers/date/dayjs/dayjs';
import { UserCreateDTO } from '../../../common/dtos/user/UserCreateDTO';

const fWidth = 500;

export interface IUserCreate {
  full_name: string;
  date_of_birth: Date | null;
  series_passport: string;
  date_of_issue_of_passport: Date | null;
  id_authority_that_issued_the_passport: number | null;
  ITN: string;
  email: string;
  id_role: number | null;
  id_organizations: number | null;
  passport_number: string;
  id_position: number | null;
  region: string;
  city: string;
  street: string;
  house_number: number | null;
  flat_number: number | null;
}

const initialStateUserData: IUserCreate = {
  full_name: '',
  date_of_birth: null,
  series_passport: '',
  date_of_issue_of_passport: null,
  id_authority_that_issued_the_passport: null,
  ITN: '',
  email: '',
  id_role: null,
  id_organizations: null,
  passport_number: '',
  id_position: null,
  region: '',
  city: '',
  street: '',
  house_number: null,
  flat_number: null,
};

interface IUserCheck {
  full_name: boolean;
  series_passport: boolean;
  id_authority_that_issued_the_passport: boolean;
  ITN: boolean;
  email: boolean;
  id_role: boolean;
  id_organizations: boolean;
  passport_number: boolean;
  id_position: boolean;
  region: boolean;
  city: boolean;
  street: boolean;
  house_number: boolean;
}

const initialCheckState: IUserCheck = {
  full_name: true,
  series_passport: true,
  id_authority_that_issued_the_passport: true,
  ITN: true,
  email: true,
  id_role: true,
  id_organizations: true,
  passport_number: true,
  id_position: true,
  region: true,
  city: true,
  street: true,
  house_number: true,
};

export function CreateUser() {
  const dispatch = useTypedDispatch();

  const autocompleteFields = useTypedSelector(loadRegistrars);

  React.useEffect(() => {
    dispatch(fetchUsersRelations());
  }, [dispatch]);

  const [userData, setUserData] =
    React.useState<IUserCreate>(initialStateUserData);
  const [userCheckFields, setUserCheckFields] =
    React.useState<IUserCheck>(initialCheckState);

  const handleOnClickAdd = () => {
    if (
      Object.values(userData).every(
        (element) => element === null || element === '',
      )
    )
      return;
    else if (Object.values(userCheckFields).every((element) => element)) {
      const user: UserCreateDTO = {
        email: userData.email,
        full_name: userData.full_name,
        date_of_birth:
          userData.date_of_birth !== null
            ? getDateStr(userData.date_of_birth)
            : '',
        series_passport: userData.series_passport,
        passport_number: userData.passport_number,
        date_of_issue_of_passport:
          userData.date_of_issue_of_passport !== null
            ? getDateStr(userData.date_of_issue_of_passport)
            : '',
        id_authority_that_issued_the_passport:
          userData.id_authority_that_issued_the_passport === null
            ? 0
            : userData.id_authority_that_issued_the_passport,
        ITN: userData.ITN,
        id_organizations:
          userData.id_organizations === null ? 0 : userData.id_organizations,
        id_position: userData.id_position === null ? 0 : userData.id_position,
        region: userData.region,
        city: userData.city,
        street: userData.street,
        house_number:
          userData.house_number === null ? 0 : userData.house_number,
        flat_number: userData.flat_number,
      };
      dispatch(createUser(user));
    }
  };

  return (
    <Paper
      sx={{
        margin: 'auto',
        flexGrow: 1,

        padding: 2,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        // spacing={{ xs: 1, sm: 2, md: 4, p: 2 }}
        spacing={2}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Назва державного органу"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="ПІБ"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Дата народження"
              value={userData.date_of_birth}
              onChange={(newValue) => {
                setUserData({ ...userData, date_of_birth: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: fWidth }} />
              )}
            />
          </LocalizationProvider>
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Номер паспорта"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Серія паспорта"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Дата видачі паспорту"
              value={userData.date_of_issue_of_passport}
              onChange={(newValue) => {
                setUserData({
                  ...userData,
                  date_of_issue_of_passport: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: fWidth }} />
              )}
            />
          </LocalizationProvider>
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Орган, що видав паспорт"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Рекомендаційний номер облікової карти платника"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Електронна адреса"
            variant="outlined"
            sx={{ width: fWidth }}
          />
        </Stack>
      </Grid>
      <Box textAlign="center">
        <Button variant="outlined">Добавити</Button>
      </Box>
    </Paper>
  );
}
