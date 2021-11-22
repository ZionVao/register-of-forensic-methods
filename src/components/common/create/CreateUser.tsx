import { Button, Grid, Paper, Stack, TextField } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from 'react';

const fWidth = 300;

export function CreateUser() {
  const [value, setValue] = React.useState<Date | null>(null);
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
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
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
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: fWidth }} />
              )}
            />
          </LocalizationProvider>
          <Button variant="outlined">Добавити</Button>
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
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
    </Paper>
  );
}
