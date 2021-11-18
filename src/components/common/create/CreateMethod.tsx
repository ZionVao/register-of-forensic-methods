import {
  Paper,
  Box,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Input,
  InputLabel,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from 'react';

export const CreateMethod = () => {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isEmailValid, setIsEmailValid] = React.useState(true);
  // const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const [value, setValue] = React.useState<Date | null>(null);

  const fWidth = 500;
  return (
    <Paper sx={{ margin: 'auto', flexGrow: 1, padding: 2 }}>
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
            sx={{ width: fWidth }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { label: 'The Shawshank Redemption', year: 1994 },
              { label: 'The Godfather', year: 1972 },
              { label: 'The Godfather: Part II', year: 1974 },
              { label: 'The Dark Knight', year: 2008 },
              { label: '12 Angry Men', year: 1957 },
            ]}
            sx={{ width: fWidth }}
            renderInput={(params) => (
              <TextField {...params} label="Вид екпертизи" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { label: 'The Shawshank Redemption', year: 1994 },
              { label: 'The Godfather', year: 1972 },
              { label: 'The Godfather: Part II', year: 1974 },
              { label: 'The Dark Knight', year: 2008 },
              { label: '12 Angry Men', year: 1957 },
            ]}
            sx={{ width: fWidth }}
            renderInput={(params) => (
              <TextField {...params} label="Підвид експертизи" />
            )}
          />
          <TextField
            id="outlined-basic"
            label="Назва методики"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Рік створення методики"
            variant="outlined"
            sx={{ width: fWidth }}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="outlined-basic"
            label="Рік внесення змін до методики"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Рік припинення застосування методики"
            variant="outlined"
            sx={{ width: fWidth }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Дата прийняття рішення про державну реєстрацію"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: fWidth }} />
              )}
            />
          </LocalizationProvider>
          <InputLabel htmlFor="import-button" sx={{ width: fWidth }}>
            <Grid container direction="column" justifyContent="space-between">
              {'Рецензія на звіт'}

              <Input
                id="import-button"
                inputProps={{
                  accept: '.png',
                }}
                //   onChange={onInputChange}
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
                //   onChange={onInputChange}
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
                //   onChange={onInputChange}
                type="file"
              />
            </Grid>
          </InputLabel>
        </Stack>
      </Grid>
    </Paper>
  );
};
