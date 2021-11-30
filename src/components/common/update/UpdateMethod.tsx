import {
  Paper,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { fetchTypesData } from '../../../store/type/actions';
import { loadTypes } from '../../../store/type/slice';
import { DomainDTO } from '../../../common/dtos/domain/DomainDTO';
import validator from 'validator';
import {
  IMethodCheck,
  IUpdateMethod,
  initialMethodCheckValid,
  initialState,
} from './interfaces';
import { getDateStr, getYear } from '../../../helpers/date/dayjs/dayjs';
import { getMethodById, updateMethod } from '../../../store/method/actions';
import { MethodDTO } from '../../../common/dtos/method/MethodDTO';

export const UpdateMethod = (props: { id: number }) => {
  const types = useTypedSelector(loadTypes);
  const dispatch = useTypedDispatch();
  const [methodData, setMethodData] =
    React.useState<IUpdateMethod>(initialState);
  const [prevStateMethod, setPrevState] = React.useState<MethodDTO>();

  React.useEffect(() => {
    async function fetchData() {
      const method = await dispatch(getMethodById(props.id));
      console.log(method, 'dispatch');

      setPrevState(method);
    }
    fetchData();
    dispatch(fetchTypesData());
  }, [dispatch, props.id]);

  const [methodCheckFields, setCheckField] = React.useState<IMethodCheck>(
    initialMethodCheckValid,
  );

  const handleOnClickChange = () => {
    console.log(methodData);

    if (
      Object.values(methodCheckFields).every((element) => element) &&
      methodData
    ) {
      const form = new FormData();

      if (!validator.isEmpty(methodData.registration_code))
        form.append('registration_code', methodData.registration_code);
      if (methodData.id_domains !== null)
        form.append('id_domains', methodData.id_domains.toString());
      if (!validator.isEmpty(methodData.name))
        form.append('name', methodData.name);

      if (methodData.year_creation !== null)
        form.append(
          'year_creation',
          getYear(methodData.year_creation).toString(),
        );
      if (methodData.year_making_changes !== null) {
        form.append(
          'year_making_changes',
          getYear(methodData.year_making_changes).toString(),
        );
      }
      if (methodData.year_termination_application !== null)
        form.append(
          'year_termination_application',
          getYear(methodData.year_termination_application).toString(),
        );

      if (methodData.date_of_decision_on_state_registration !== null)
        form.append(
          'date_of_decision_on_state_registration',
          getDateStr(methodData.date_of_decision_on_state_registration),
        );
      if (methodData.date_of_decision_on_state_registration_of_changes !== null)
        form.append(
          'date_of_decision_on_state_registration_of_changes',
          getDateStr(
            methodData.date_of_decision_on_state_registration_of_changes,
          ),
        );

      if (methodData.date_of_decision_to_terminate_the_application !== null)
        form.append(
          'date_of_decision_to_terminate_the_application',
          getDateStr(methodData.date_of_decision_to_terminate_the_application),
        );

      form.append('author', methodData.author);

      dispatch(updateMethod(props.id, form));
    } else {
      return;
    }
  };

  const domains: DomainDTO[] = [];
  types.types.forEach((type) => {
    domains.push(...type.domains);
  });

  const typeNames = types.types.reduce(
    (
      acc: {
        [id: number | string]: string;
      },
      obj,
    ) => {
      acc[obj.id] = obj.name;
      return acc;
    },
    {},
  );

  const domainsName = types.types.reduce(
    (
      acc: {
        [id: number | string]: string;
      },
      obj,
    ) => {
      obj.domains.forEach((el) => {
        acc[el.id] = el.name;
      });
      return acc;
    },
    {},
  );

  const fWidth = 500;
  if (prevStateMethod)
    return (
      <Paper sx={{ margin: 'auto', flexGrow: 1, padding: 2 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TableContainer
            component={Paper}
            sx={{ minWidth: 650, maxWidth: 1000 }}
          >
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  // key={'row'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {prevStateMethod.registration_code}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Реєстраційний код"
                      variant="outlined"
                      value={methodData.registration_code}
                      error={!methodCheckFields.registration_code}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setMethodData({
                          ...methodData,
                          registration_code: event.target.value,
                        })
                      }
                      onBlur={() => {
                        setMethodData({
                          ...methodData,
                          registration_code:
                            methodData.registration_code.trim(),
                        });
                        setCheckField({
                          ...methodCheckFields,
                          registration_code:
                            /^[0-9]+[.][0-9]+[.][0-9]+$/.test(
                              methodData.registration_code,
                            ) ||
                            validator.isEmpty(methodData.registration_code),
                        });
                      }}
                      size="small"
                      sx={{ width: fWidth }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  // key={'row'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {domainsName[prevStateMethod.domainsOfMethod.id]}
                  </TableCell>
                  <TableCell align="right">
                    <Autocomplete
                      options={domains.sort(
                        (a, b) =>
                          -b.id_types
                            .toString()
                            .localeCompare(a.id_types.toString()),
                      )}
                      groupBy={(option) => typeNames[option.id_types]}
                      getOptionLabel={(option) => option.name}
                      onChange={(event: any, option: DomainDTO | null) =>
                        setMethodData({
                          ...methodData,
                          id_domains: option === null ? null : option.id,
                        })
                      }
                      sx={{ width: fWidth }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Вид експертизи"
                          error={!methodCheckFields.id_domains}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  // key={'row'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {prevStateMethod.name}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Назва методики"
                      variant="outlined"
                      size="small"
                      sx={{ width: fWidth }}
                      value={methodData.name}
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                        setMethodData({
                          ...methodData,
                          name: event.target.value.trim(),
                        });
                      }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setMethodData({
                          ...methodData,
                          name: event.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  // key={'row'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {prevStateMethod.author}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Автор"
                      variant="outlined"
                      size="small"
                      sx={{ width: fWidth }}
                      value={methodData.author}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setMethodData({
                          ...methodData,
                          author: event.target.value,
                        })
                      }
                      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                        setMethodData({
                          ...methodData,
                          author: event.target.value.trim(),
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TableRow
                    // key={'row'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prevStateMethod.year_creation}
                    </TableCell>
                    <TableCell align="right">
                      <DatePicker
                        views={['year']}
                        label="Рік створення методики"
                        value={methodData.year_creation}
                        maxDate={new Date()}
                        onChange={(newValue) =>
                          setMethodData({
                            ...methodData,
                            year_creation: newValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            sx={{ width: fWidth }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={'row'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prevStateMethod.year_making_changes}
                    </TableCell>
                    <TableCell align="right">
                      <DatePicker
                        views={['year']}
                        label="Рік внесення змін до методики"
                        value={methodData.year_making_changes}
                        onChange={(newValue) =>
                          setMethodData({
                            ...methodData,
                            year_making_changes: newValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{ width: fWidth }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={'row'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prevStateMethod.year_termination_application}
                    </TableCell>
                    <TableCell align="right">
                      <DatePicker
                        views={['year']}
                        label="Рік припинення застосування методики"
                        value={methodData.year_termination_application}
                        onChange={(newValue) =>
                          setMethodData({
                            ...methodData,
                            year_termination_application: newValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{ width: fWidth }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={'row'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prevStateMethod.date_of_decision_on_state_registration}
                    </TableCell>
                    <TableCell align="right">
                      <DatePicker
                        label="Дата прийняття рішення про державну реєстрацію"
                        value={
                          methodData.date_of_decision_on_state_registration
                        }
                        onChange={(newValue) =>
                          setMethodData({
                            ...methodData,
                            date_of_decision_on_state_registration: newValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{ width: fWidth }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={'row'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {
                        prevStateMethod.date_of_decision_on_state_registration_of_changes
                      }
                    </TableCell>
                    <TableCell align="right">
                      <DatePicker
                        label="Дата прийняття рішення про внесення змін у методику"
                        value={
                          methodData.date_of_decision_on_state_registration_of_changes
                        }
                        onChange={(newValue) =>
                          setMethodData({
                            ...methodData,
                            date_of_decision_on_state_registration_of_changes:
                              newValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{ width: fWidth }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={'row'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {
                        prevStateMethod.date_of_decision_to_terminate_the_application
                      }
                    </TableCell>
                    <TableCell align="right">
                      <DatePicker
                        label="Дата прийняття рішення про припинення застосування методики"
                        value={
                          methodData.date_of_decision_to_terminate_the_application
                        }
                        onChange={(newValue) =>
                          setMethodData({
                            ...methodData,
                            date_of_decision_to_terminate_the_application:
                              newValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{ width: fWidth }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </LocalizationProvider>
              </TableBody>
            </Table>
            <TableRow>
              <TableCell align="center">
                <Button variant="contained" onClick={handleOnClickChange}>
                  Оновити
                </Button>
              </TableCell>
            </TableRow>
          </TableContainer>
        </Grid>
      </Paper>
    );
  else return null;
};
