import * as React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { loadTransactios } from '../../../store/transaction/slice';
import { TransactionFilter } from '../../../services/interfaces/interfaces';
import { fetchTransactionData } from '../../../store/transaction/actions';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Table,
  TableBody,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Paper,
  Box,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import validator from 'validator';
import { getDateStr } from '../../../helpers/date/dayjs/dayjs';

const fWidth = 300;

const transactionFilter: TransactionFilter = {
  page: 1,
  count: 10,
};

interface SearchFields {
  full_name: string;
  email: string;
  code: string;
}

interface CheckFields {
  date1: string | null;
  date2: string | null;
  id_typeAction: number | null;
}

const initialSFields: SearchFields = {
  full_name: '',
  email: '',
  code: '',
};

function PaginationSearch(props: {
  onSearch: (searchData: SearchFields, check: CheckFields) => void;
}) {
  const [searchData, setSearchData] =
    React.useState<SearchFields>(initialSFields);

  const [dateValue, setDates] = React.useState<DateRange<Date>>([null, null]);

  const [action, setAction] = React.useState<number | null>(null);

  const handleChangeAction = (
    event: React.MouseEvent<HTMLElement>,
    newAction: number,
  ) => {
    setAction(newAction);
  };

  const handleSearch = () => {
    const fields: CheckFields = {
      date1: dateValue[0] === null ? null : getDateStr(dateValue[0]),
      date2: dateValue[1] === null ? null : getDateStr(dateValue[1]),
      id_typeAction: action === null ? null : action,
    };
    console.log(searchData);

    props.onSearch(searchData, fields);
  };
  return (
    <Box
      sx={{
        width: '100wh',
        mx: 'auto',
        p: 3,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
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
            label="ПІБ"
            variant="outlined"
            value={searchData.full_name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              console.log(event.target.value, 'ertyui');

              setSearchData({
                ...searchData,
                full_name: event.target.value,
              });
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                full_name: searchData.full_name.trim(),
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Електронна пошта"
            variant="outlined"
            value={searchData.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                email: event.target.value,
              })
            }
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              setSearchData({ ...searchData, email: searchData.email.trim() })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Реєстраційний код"
            variant="outlined"
            value={searchData.code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                code: event.target.value,
              })
            }
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              setSearchData({ ...searchData, code: searchData.code.trim() })
            }
            sx={{ width: fWidth }}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={dateValue}
              onChange={(newValue) => {
                setDates(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> --- </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
          <ToggleButtonGroup
            color="primary"
            value={action}
            exclusive
            onChange={handleChangeAction}
          >
            <ToggleButton value={1}>Створення</ToggleButton>
            <ToggleButton value={2}>Зміна</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Grid>
      <Box textAlign="center" sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleSearch}>
          Пошук
        </Button>
      </Box>
    </Box>
  );
}

export function TransactionTable() {
  const transactions = useTypedSelector(loadTransactios);

  const dispatch = useTypedDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    transactionFilter.page = newPage;
    dispatch(fetchTransactionData(transactionFilter));
  };

  React.useEffect(() => {
    dispatch(fetchTransactionData(transactionFilter));
  }, [dispatch]);

  const handleSearch = React.useCallback(
    (searchData: SearchFields, fields: CheckFields) => {
      transactionFilter.page = 1;
      transactionFilter.count = 10;
      transactionFilter.full_name = validator.isEmpty(searchData.full_name)
        ? undefined
        : searchData.full_name;
      transactionFilter.code = validator.isEmpty(searchData.code)
        ? undefined
        : searchData.code;
      transactionFilter.email = validator.isEmpty(searchData.email)
        ? undefined
        : searchData.email;
      transactionFilter.date1 =
        fields.date1 === null ? undefined : fields.date1;
      transactionFilter.date2 =
        fields.date2 === null ? undefined : fields.date2;
      transactionFilter.id_typeAction =
        fields.id_typeAction === null ? undefined : fields.id_typeAction;
      dispatch(fetchTransactionData(transactionFilter));
    },
    [dispatch],
  );

  return (
    <>
      <PaginationSearch onSearch={handleSearch} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Час внесення змін Реєстратором у Реєстр</TableCell>
              <TableCell align="right">Логін Реєстратора</TableCell>
              <TableCell align="right">ПІБ Реєстратора</TableCell>
              <TableCell align="right">Опис операції</TableCell>
              <TableCell align="right">Реєстраційний код методики</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.transactions.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                  {index + 1 + transactions.count * (transactions.page - 1)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.datetime}
                </TableCell>
                <TableCell align="right">{row.users.email}</TableCell>
                <TableCell align="right">{row.users.full_name}</TableCell>
                <TableCell align="right">{row.typeAction.name}</TableCell>
                <TableCell align="right">
                  {row.method === null ? '' : row.method.registration_code}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={transactions.page}
          count={transactions.totalPages}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </TableContainer>
    </>
  );
}
