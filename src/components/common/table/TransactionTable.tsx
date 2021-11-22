import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { loadTransactios } from '../../../store/transaction/slice';
import { TransactionFilter } from '../../../services/interfaces/interfaces';
import { fetchTransactionData } from '../../../store/transaction/actions';
import { Pagination } from '@mui/material';

const transactionFilter: TransactionFilter = {
  page: 1,
  count: 10,
};

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

  return (
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
                {row.methodslogs === null
                  ? ''
                  : row.methodslogs.registration_code}
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
  );
}
