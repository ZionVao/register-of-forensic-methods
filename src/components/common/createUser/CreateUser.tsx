import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
} from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { initialStateUserData, IUserCreate } from './interfaces';
import { validationUserSchema } from './validationSchema';

const fWidth = 400;

export function CreateUser() {
  const dispatch = useTypedDispatch();

  const autocompleteFields = useTypedSelector(loadRegistrars);

  React.useEffect(() => {
    dispatch(fetchUsersRelations());
  }, [dispatch]);

  const [userData, setUserData] =
    React.useState<IUserCreate>(initialStateUserData);

  const handleOnClickAdd = () => {
    if (
      Object.values(userData).every(
        (element) => element === null || element === '',
      )
    )
      return;
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
      house_number: userData.house_number,
      flat_number: userData.flat_number,
    };
    console.log(user);

    dispatch(createUser(user));
  };
  const organizations = Object.keys(autocompleteFields.organizations).map(
    (e) => ({ id: Number(e), name: autocompleteFields.organizations[e].name }),
  );

  const authorities = Object.keys(autocompleteFields.authorities).map((e) => ({
    id: Number(e),
    name: autocompleteFields.authorities[e].name,
  }));

  const positions = Object.keys(autocompleteFields.position).map((e) => ({
    id: Number(e),
    name: autocompleteFields.position[e].name,
  }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationUserSchema) });

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
            id="full_name"
            label="??????"
            variant="outlined"
            required
            {...register('full_name')}
            error={errors.full_name ? true : false}
            helperText={errors.full_name?.message}
            value={userData.full_name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                full_name: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />

          <TextField
            id="email"
            label="???????????????????? ????????????"
            variant="outlined"
            required
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            value={userData.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                email: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <Controller
            name="id_organizations"
            control={control}
            defaultValue={[]}
            render={({ field: { ref, ...field } }) => (
              <Autocomplete
                disablePortal
                id="id_organizations"
                options={organizations}
                sx={{ width: fWidth }}
                getOptionLabel={(option) => option.name}
                onChange={(
                  event: any,
                  option: { name: string; id: number } | null,
                ) => {
                  setUserData({
                    ...userData,
                    id_organizations: option === null ? null : option.id,
                  });
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="?????????? ???????????????????? ????????????"
                    // {...register('id_organizations')}
                    error={errors.id_organizations ? true : false}
                    helperText={errors.id_organizations?.message}
                    inputRef={ref}
                  />
                )}
              />
            )}
          />

          <Controller
            name="id_position"
            control={control}
            defaultValue={[]}
            render={({ field: { ref, ...field } }) => (
              <Autocomplete
                disablePortal
                id="id_position"
                options={positions}
                sx={{ width: fWidth }}
                getOptionLabel={(option) => option.name}
                onChange={(
                  event: any,
                  option: { name: string; id: number } | null,
                ) => {
                  setUserData({
                    ...userData,
                    id_position: option === null ? null : option.id,
                  });
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="????????????"
                    {...register('id_position')}
                    error={errors.id_position ? true : false}
                    helperText={errors.id_position?.message}
                    inputRef={ref}
                  />
                )}
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="date_of_birth"
              control={control}
              // defaultValue={}
              // rules={rules}
              render={({ field: { ref, ...field } }) => (
                <DatePicker
                  label="???????? ????????????????????"
                  value={userData.date_of_birth}
                  // defaultValue={null}

                  // {...register('date_of_birth')}
                  onChange={(newValue) => {
                    setUserData({ ...userData, date_of_birth: newValue });
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors.date_of_birth ? true : false}
                      helperText={errors.date_of_birth?.message}
                      // inputRef={ref}
                      sx={{ width: fWidth }}
                    />
                  )}
                />
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
            id="ITN"
            label="???????????????????????????????? ?????? ???????????????? ????????????????"
            variant="outlined"
            required
            {...register('ITN')}
            error={errors.ITN ? true : false}
            helperText={errors.ITN?.message}
            value={userData.ITN}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                ITN: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="passport_number"
            label="?????????? ????????????????"
            variant="outlined"
            required
            {...register('passport_number')}
            error={errors.passport_number ? true : false}
            helperText={errors.passport_number?.message}
            value={userData.passport_number}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                passport_number: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="series_passport"
            label="?????????? ????????????????"
            variant="outlined"
            {...register('series_passport')}
            error={errors.series_passport ? true : false}
            helperText={errors.series_passport?.message}
            value={userData.series_passport}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                series_passport: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />

          <Controller
            name="id_authority_that_issued_the_passport"
            control={control}
            defaultValue={[]}
            render={({ field: { ref, ...field } }) => (
              <Autocomplete
                disablePortal
                id="id_authority_that_issued_the_passport"
                options={positions}
                sx={{ width: fWidth }}
                getOptionLabel={(option) => option.name}
                onChange={(
                  event: any,
                  option: { name: string; id: number } | null,
                ) => {
                  setUserData({
                    ...userData,
                    id_authority_that_issued_the_passport:
                      option === null ? null : option.id,
                  });
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="??????????, ???? ?????????? ??????????????"
                    {...register('id_authority_that_issued_the_passport')}
                    error={
                      errors.id_authority_that_issued_the_passport
                        ? true
                        : false
                    }
                    helperText={
                      errors.id_authority_that_issued_the_passport?.message
                    }
                    inputRef={ref}
                  />
                )}
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="date_of_issue_of_passport"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <DatePicker
                  label="???????? ???????????? ????????????????"
                  value={userData.date_of_issue_of_passport}
                  onChange={(newValue) => {
                    setUserData({
                      ...userData,
                      date_of_issue_of_passport: newValue,
                    });
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors.date_of_issue_of_passport ? true : false}
                      helperText={errors.date_of_issue_of_passport?.message}
                      sx={{ width: fWidth }}
                    />
                  )}
                />
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
            id="region"
            label="??????????????"
            variant="outlined"
            required
            {...register('region')}
            error={errors.region ? true : false}
            helperText={errors.region?.message}
            value={userData.region}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                region: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="city"
            label="??????????/????????"
            variant="outlined"
            required
            {...register('city')}
            error={errors.city ? true : false}
            helperText={errors.city?.message}
            value={userData.city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                city: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="street"
            label="????????????"
            variant="outlined"
            required
            {...register('street')}
            error={errors.street ? true : false}
            helperText={errors.street?.message}
            value={userData.street}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                street: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="house_number"
            label="?????????? ??????????????"
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
                type: 'text',
                inputmode: 'numeric',
                pattern: '[0-9]*',
              },
            }}
            variant="outlined"
            required
            {...register('house_number')}
            error={errors.house_number ? true : false}
            helperText={errors.house_number?.message}
            value={userData.house_number}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                house_number: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="flat_number"
            label="?????????? ????????????????"
            variant="outlined"
            type="number"
            {...register('flat_number')}
            error={errors.flat_number ? true : false}
            helperText={errors.flat_number?.message}
            InputProps={{
              inputProps: {
                min: 1,
              },
              required: true,
            }}
            inputProps={{
              required: true,
            }}
            value={userData.flat_number}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                flat_number: /^\d+$/.test(event.target.value)
                  ? Number(event.target.value)
                  : null,
              })
            }
            sx={{ width: fWidth }}
          />
        </Stack>
      </Grid>
      <Box textAlign="center">
        <Button variant="outlined" onClick={handleSubmit(handleOnClickAdd)}>
          ????????????????
        </Button>
      </Box>
    </Paper>
  );
}
