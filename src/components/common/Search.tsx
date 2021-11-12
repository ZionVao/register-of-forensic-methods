import * as React from 'react';
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Paper,
  Divider,
  Button,
} from '@mui/material';

export default function SearchOptions() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <TextField
            fullWidth
            id="outlined-search fullWidth"
            label="Search field"
            type="search"
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Button variant="text">Пошук</Button>
        </Paper>
      </div>
    </Box>
  );
}
