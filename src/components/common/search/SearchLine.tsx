import {
  Tabs,
  Tab,
  Box,
  TextField,
  Paper,
  Divider,
  Button,
} from '@mui/material';

import { useState } from 'react';

export default function SearchLine(params: {
  onSubmit: (name: string) => void;
}) {
  const [field, setSearchField] = useState('');
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 500,
        }}
      >
        <TextField
          fullWidth
          id="outlined-search fullWidth"
          label="Search field"
          type="search"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(event.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <Button variant="text" onClick={() => params.onSubmit(field)}>
          Пошук
        </Button>
      </Paper>
    </Box>
  );
}
