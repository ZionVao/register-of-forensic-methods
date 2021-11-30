import {
  Paper,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Input,
  InputLabel,
  Button,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { fetchTypesData } from '../../../store/type/actions';
import { loadTypes } from '../../../store/type/slice';
import { DomainDTO } from '../../../common/dtos/domain/DomainDTO';
import {
  IDoc,
  IMethodCreate,
  initialDocsState,
  initialState,
} from './interfaces';
import { getDateStr, getYear } from '../../../helpers/date/dayjs/dayjs';
import { createMethod } from '../../../store/method/actions';
import { validationSchema } from './validationSchema';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const CreateMethod = () => {
  const types = useTypedSelector(loadTypes);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchTypesData());
  }, [dispatch]);

  const [methodData, setMethodData] =
    React.useState<IMethodCreate>(initialState);

  const [docs, setDocs] = React.useState<IDoc>(initialDocsState);

  const handleOnClickAdd = () => {
    if (Object.values(docs).every((element) => element === null)) return;
    else if (
      Object.values(methodData).every(
        (element) => element === null || element === '',
      )
    )
      return;
    else {
      const form = new FormData();
      // form.

      // form.append('data', methodData.registration_code, 'f');
      // form.append('data', methodData.registration_code, 'files');

      form.append('registration_code', methodData.registration_code);
      console.log(methodData);
      console.log(docs);

      form.append(
        'id_domains',
        methodData.id_domains === null ? '' : methodData.id_domains.toString(),
      );
      form.append('name', methodData.name);
      form.append(
        'year_creation',
        methodData.year_creation === null
          ? ''
          : getYear(methodData.year_creation).toString(),
      );
      if (methodData.year_making_changes !== null) {
        form.append(
          'year_making_changes',
          getYear(methodData.year_making_changes).toString(),
        );
      }
      if (methodData.year_termination_application !== null) {
        form.append(
          'year_termination_application',
          getYear(methodData.year_termination_application).toString(),
        );
      }
      form.append(
        'date_of_decision_on_state_registration',
        methodData.date_of_decision_on_state_registration === null
          ? ''
          : getDateStr(methodData.date_of_decision_on_state_registration),
      );
      if (
        methodData.date_of_decision_on_state_registration_of_changes !== null
      ) {
        form.append(
          'date_of_decision_on_state_registration_of_changes',
          getDateStr(
            methodData.date_of_decision_on_state_registration_of_changes,
          ),
        );
      }
      if (methodData.date_of_decision_to_terminate_the_application !== null) {
        form.append(
          'date_of_decision_to_terminate_the_application',
          getDateStr(methodData.date_of_decision_to_terminate_the_application),
        );
      }

      if (docs.doc_copy_of_method !== null) {
        form.append('doc_copy_of_method', docs.doc_copy_of_method);
      }

      if (docs.doc_report_review !== null) {
        form.append('doc_report_review', docs.doc_report_review);
      }

      if (docs.doc_certificate_of_approbation !== null) {
        form.append(
          'doc_certificate_of_approbation',
          docs.doc_certificate_of_approbation,
        );
      }

      if (docs.doc_copy_of_implementation !== null) {
        form.append(
          'doc_copy_of_implementation',
          docs.doc_copy_of_implementation,
        );
      }

      if (docs.doc_discount_card !== null) {
        form.append('doc_discount_card', docs.doc_discount_card);
      }

      form.append('author', methodData.author);

      dispatch(createMethod(form));
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const fWidth = 500;
  return (
    <Paper sx={{ margin: 'auto', flexGrow: 1, padding: 2 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          sx={{ flexGrow: 1 }}
          spacing={2}
        >
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <TextField
              id="registration_code"
              label="Реєстраційний код"
              variant="outlined"
              {...register('registration_code')}
              error={errors.registration_code ? true : false}
              helperText={errors.registration_code?.message}
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMethodData({
                  ...methodData,
                  registration_code: event.target.value,
                })
              }
              size="small"
              sx={{ width: fWidth }}
            />
            <Controller
              name="id_domains"
              control={control}
              defaultValue={[]}
              render={({ field: { ref, ...field } }) => (
                <Autocomplete
                  id="grouped-demo"
                  options={domains.sort(
                    (a, b) =>
                      -b.id_types
                        .toString()
                        .localeCompare(a.id_types.toString()),
                  )}
                  groupBy={(option) => typeNames[option.id_types]}
                  getOptionLabel={(option) => option.name}
                  onChange={(event: any, option: DomainDTO | null) => {
                    setMethodData({
                      ...methodData,
                      id_domains: option === null ? null : option.id,
                    });
                    field.onChange(option);
                  }}
                  sx={{ width: fWidth }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      size="small"
                      label="Вид експертизи"
                      error={errors.id_domains ? true : false}
                      helperText={errors.id_domains?.message}
                      inputRef={ref}
                    />
                  )}
                />
              )}
            />

            <TextField
              id="name"
              label="Назва методики"
              variant="outlined"
              size="small"
              sx={{ width: fWidth }}
              required
              {...register('name')}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMethodData({
                  ...methodData,
                  name: event.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Автор"
              variant="outlined"
              size="small"
              sx={{ width: fWidth }}
              required
              {...register('author')}
              error={errors.author ? true : false}
              helperText={errors.author?.message}
              value={methodData.author}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMethodData({
                  ...methodData,
                  author: event.target.value,
                })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="year_creation"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <DatePicker
                    views={['year']}
                    label="Рік створення методики"
                    value={methodData.year_creation}
                    maxDate={new Date()}
                    onChange={(newValue) => {
                      setMethodData({
                        ...methodData,
                        year_creation: newValue,
                      });
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        size="small"
                        {...params}
                        error={errors.year_creation ? true : false}
                        helperText={errors.year_creation?.message}
                        sx={{ width: fWidth }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="year_making_changes"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <DatePicker
                    views={['year']}
                    label="Рік внесення змін до методики"
                    value={methodData.year_making_changes}
                    onChange={(newValue) => {
                      setMethodData({
                        ...methodData,
                        year_making_changes: newValue,
                      });
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors.year_making_changes ? true : false}
                        helperText={errors.year_making_changes?.message}
                        size="small"
                        sx={{ width: fWidth }}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="year_termination_application"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <DatePicker
                    views={['year']}
                    label="Рік припинення застосування методики"
                    value={methodData.year_termination_application}
                    onChange={(newValue) => {
                      setMethodData({
                        ...methodData,
                        year_termination_application: newValue,
                      });
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          errors.year_termination_application ? true : false
                        }
                        helperText={
                          errors.year_termination_application?.message
                        }
                        size="small"
                        sx={{ width: fWidth }}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="date_of_decision_on_state_registration"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <DatePicker
                    label="Дата прийняття рішення про державну реєстрацію"
                    value={methodData.date_of_decision_on_state_registration}
                    onChange={(newValue) => {
                      setMethodData({
                        ...methodData,
                        date_of_decision_on_state_registration: newValue,
                      });
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          errors.date_of_decision_on_state_registration
                            ? true
                            : false
                        }
                        helperText={
                          errors.date_of_decision_on_state_registration?.message
                        }
                        required
                        size="small"
                        sx={{ width: fWidth }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="date_of_decision_on_state_registration_of_changes"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <DatePicker
                    label="Дата прийняття рішення про внесення змін у методику"
                    value={
                      methodData.date_of_decision_on_state_registration_of_changes
                    }
                    onChange={(newValue) => {
                      setMethodData({
                        ...methodData,
                        date_of_decision_on_state_registration_of_changes:
                          newValue,
                      });
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          errors.date_of_decision_on_state_registration_of_changes
                            ? true
                            : false
                        }
                        helperText={
                          errors
                            .date_of_decision_on_state_registration_of_changes
                            ?.message
                        }
                        size="small"
                        sx={{ width: fWidth }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="date_of_decision_to_terminate_the_application"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <DatePicker
                    label="Дата прийняття рішення про припинення застосування методики"
                    value={
                      methodData.date_of_decision_to_terminate_the_application
                    }
                    onChange={(newValue) => {
                      setMethodData({
                        ...methodData,
                        date_of_decision_to_terminate_the_application: newValue,
                      });
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          errors.date_of_decision_to_terminate_the_application
                            ? true
                            : false
                        }
                        helperText={
                          errors.date_of_decision_to_terminate_the_application
                            ?.message
                        }
                        size="small"
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
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Controller
              name="doc_report_review"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    {'Рецензія на звіт'}

                    <Input
                      id="import-button"
                      inputProps={{
                        accept: ['.png', 'jpg', '.jpeg'],
                      }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (event.target.files !== null) {
                          setDocs({
                            ...docs,
                            doc_report_review: event.target.files[0],
                          });
                          field.onChange(event.target.files[0]);
                        } else field.onChange(null);
                      }}
                      error={errors.doc_report_review ? true : false}
                      type="file"
                    />
                  </Grid>
                </InputLabel>
              )}
            />
            <Controller
              name="doc_copy_of_method"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    {'Рiшення наукової ради щодо впровадження'}

                    <Input
                      id="import-button"
                      inputProps={{
                        accept: ['.png', 'jpg', '.jpeg'],
                      }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (event.target.files !== null) {
                          setDocs({
                            ...docs,
                            doc_copy_of_method: event.target.files[0],
                          });
                          field.onChange(event.target.files[0]);
                        } else field.onChange(null);
                      }}
                      error={errors.doc_copy_of_method ? true : false}
                      type="file"
                    />
                  </Grid>
                </InputLabel>
              )}
            />
            <Controller
              name="doc_certificate_of_approbation"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    {'Довідка про апробацію'}

                    <Input
                      id="import-button"
                      inputProps={{
                        accept: ['.png', 'jpg', '.jpeg'],
                      }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (event.target.files !== null) {
                          setDocs({
                            ...docs,
                            doc_certificate_of_approbation:
                              event.target.files[0],
                          });
                          field.onChange(event.target.files[0]);
                        } else field.onChange(null);
                      }}
                      error={
                        errors.doc_certificate_of_approbation ? true : false
                      }
                      type="file"
                    />
                  </Grid>
                </InputLabel>
              )}
            />
            <Controller
              name="doc_copy_of_implementation"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    {'Рішення щодо впровадження методики в експертну практику'}

                    <Input
                      id="import-button"
                      inputProps={{
                        accept: ['.png', 'jpg', '.jpeg'],
                      }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (event.target.files !== null) {
                          setDocs({
                            ...docs,
                            doc_copy_of_implementation: event.target.files[0],
                          });

                          field.onChange(event.target.files[0]);
                        } else field.onChange(null);
                      }}
                      error={errors.doc_copy_of_implementation ? true : false}
                      type="file"
                    />
                  </Grid>
                </InputLabel>
              )}
            />
            <Controller
              name="doc_discount_card"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                  >
                    {'Облікова карта'}

                    <Input
                      id="import-button"
                      inputProps={{
                        accept: ['.png', 'jpg', '.jpeg'],
                      }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (event.target.files !== null) {
                          setDocs({
                            ...docs,
                            doc_discount_card: event.target.files[0],
                          });

                          field.onChange(event.target.files[0]);
                        } else field.onChange(null);
                      }}
                      error={errors.doc_discount_card ? true : false}
                      type="file"
                    />
                  </Grid>
                </InputLabel>
              )}
            />
            <Button
              variant="contained"
              onClick={handleSubmit(handleOnClickAdd)}
            >
              Добавити
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
