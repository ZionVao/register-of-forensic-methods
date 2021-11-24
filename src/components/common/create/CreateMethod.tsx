import {
  Paper,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Input,
  InputLabel,
  Button,
  Hidden,
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
  IDoc,
  IMethodCheck,
  IMethodCreate,
  initialDocsState,
  initialMethodCheckValid,
  initialState,
} from './interfaces';

export const CreateMethod = () => {
  const types = useTypedSelector(loadTypes);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchTypesData());
  }, [dispatch]);

  const [methodData, setMethodData] =
    React.useState<IMethodCreate>(initialState);

  const [methodCheckFields, setCheckField] = React.useState<IMethodCheck>(
    initialMethodCheckValid,
  );

  const [docs, setDocs] = React.useState<IDoc>(initialDocsState);

  const handleOnClickAdd = () => {};

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
              id="outlined-basic"
              label="Реєстраційний код"
              variant="outlined"
              value={methodData.registration_code}
              error={!methodCheckFields.registration_code}
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMethodData({
                  ...methodData,
                  registration_code: event.target.value,
                })
              }
              onBlur={() =>
                setCheckField({
                  ...methodCheckFields,
                  registration_code: /^[0-9]+[.][0-9]+[.][0-9]+$/.test(
                    methodData.registration_code,
                  ),
                })
              }
              size="small"
              sx={{ width: fWidth }}
            />
            <Autocomplete
              id="grouped-demo"
              options={domains.sort(
                (a, b) =>
                  -b.id_types.toString().localeCompare(a.id_types.toString()),
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
                  required
                  size="small"
                  label="Вид експертизи"
                  error={!methodCheckFields.id_domains}
                  onBlur={() =>
                    setCheckField({
                      ...methodCheckFields,
                      id_domains: methodData.id_domains !== null,
                    })
                  }
                />
              )}
            />

            <TextField
              id="outlined-basic"
              label="Назва методики"
              variant="outlined"
              size="small"
              sx={{ width: fWidth }}
              required
              value={methodData.name}
              error={!methodCheckFields.name}
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                setMethodData({
                  ...methodData,
                  name: event.target.value.trim(),
                });
                setCheckField({
                  ...methodCheckFields,
                  name: !validator.isEmpty(methodData.name, {
                    ignore_whitespace: true,
                  }),
                });
              }}
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
              value={methodData.author}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMethodData({
                  ...methodData,
                  author: event.target.value,
                })
              }
              error={!methodCheckFields.author}
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                setMethodData({
                  ...methodData,
                  author: event.target.value.trim(),
                });
                setCheckField({
                  ...methodCheckFields,
                  author: !validator.isEmpty(methodData.author, {
                    ignore_whitespace: true,
                  }),
                });
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year']}
                label="Рік створення методики"
                value={methodData.year_creation}
                maxDate={new Date()}
                onError={() =>
                  setCheckField({
                    ...methodCheckFields,
                    year_creation: false,
                  })
                }
                onChange={(newValue) =>
                  setMethodData({
                    ...methodData,
                    year_creation: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    required
                    size="small"
                    {...params}
                    sx={{ width: fWidth }}
                  />
                )}
              />
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
                  <TextField {...params} size="small" sx={{ width: fWidth }} />
                )}
              />
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
                  <TextField {...params} size="small" sx={{ width: fWidth }} />
                )}
              />
              <DatePicker
                label="Дата прийняття рішення про державну реєстрацію"
                value={methodData.date_of_decision_on_state_registration}
                onChange={(newValue) =>
                  setMethodData({
                    ...methodData,
                    date_of_decision_on_state_registration: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    size="small"
                    sx={{ width: fWidth }}
                  />
                )}
              />
              <DatePicker
                label="Дата прийняття рішення про внесення змін у методику"
                value={
                  methodData.date_of_decision_on_state_registration_of_changes
                }
                onChange={(newValue) =>
                  setMethodData({
                    ...methodData,
                    date_of_decision_on_state_registration_of_changes: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: fWidth }} />
                )}
              />
              <DatePicker
                label="Дата прийняття рішення про припинення застосування методики"
                value={methodData.date_of_decision_to_terminate_the_application}
                onChange={(newValue) =>
                  setMethodData({
                    ...methodData,
                    date_of_decision_to_terminate_the_application: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: fWidth }} />
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
            <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
              <Grid container direction="column" justifyContent="space-between">
                {'Рецензія на звіт'}

                <Input
                  id="import-button"
                  inputProps={{
                    accept: '.png',
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files !== null) {
                      setDocs({
                        ...docs,
                        doc_report_review: event.target.files[0],
                      });
                    }
                  }}
                  type="file"
                />
              </Grid>
            </InputLabel>
            <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
              <Grid container direction="column" justifyContent="space-between">
                {'Рiшення наукової ради щодо впровадження'}

                <Input
                  id="import-button"
                  inputProps={{
                    accept: '.png',
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files !== null) {
                      setDocs({
                        ...docs,
                        doc_copy_of_method: event.target.files[0],
                      });
                    }
                  }}
                  type="file"
                />
              </Grid>
            </InputLabel>
            <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
              <Grid container direction="column" justifyContent="space-between">
                {'Довідка про апробацію'}

                <Input
                  id="import-button"
                  inputProps={{
                    accept: '.png',
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files !== null) {
                      setDocs({
                        ...docs,
                        doc_certificate_of_approbation: event.target.files[0],
                      });
                    }
                  }}
                  type="file"
                />
              </Grid>
            </InputLabel>
            <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
              <Grid container direction="column" justifyContent="space-between">
                {'Рішення щодо впровадження методики в експертну практику'}

                <Input
                  id="import-button"
                  inputProps={{
                    accept: '.png',
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files !== null) {
                      setDocs({
                        ...docs,
                        doc_copy_of_implementation: event.target.files[0],
                      });
                    }
                  }}
                  type="file"
                />
              </Grid>
            </InputLabel>
            <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
              <Grid container direction="column" justifyContent="space-between">
                {'Облікова карта'}

                <Input
                  id="import-button"
                  inputProps={{
                    accept: '.png',
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files !== null) {
                      setDocs({
                        ...docs,
                        doc_discount_card: event.target.files[0],
                      });
                    }
                  }}
                  type="file"
                />
              </Grid>
            </InputLabel>
            <Button variant="contained" onClick={handleOnClickAdd}>
              Добавити
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
