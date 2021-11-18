import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import { MethodDTO } from '../../../common/dtos/method/MethodDTO';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { loadMethods } from '../../../store/method/slice';
import { fetchMethodsData } from '../../../store/method/actions';
import { getDateStr } from '../../../helpers/date/dayjs/dayjs';
import { getUser } from '../../../store/user/slice';
import { Filter } from '../../../services/interfaces/interfaces';

interface Column {
  id:
    | 'number'
    | 'code'
    | 'type'
    | 'name'
    | 'developer'
    | 'created'
    | 'updated'
    | 'stoped'
    | 'registered'
    | 'registered_changes'
    | 'stop_date'
    | 'docs'
    | 'change_row';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
}

const columns: Column[] = [
  { id: 'number', label: '№', minWidth: 10, format: String },
  { id: 'code', label: 'Реєстраційний код', minWidth: 10 },
  {
    id: 'type',
    label: 'Вид експертизи',
    format: (value: [string, string]) => (
      <>
        <b>{value[0]}</b>
        <br />
        {value[1]}
      </>
    ),
    minWidth: 90,
  },
  { id: 'name', label: 'Назва методики', minWidth: 90 },
  { id: 'developer', label: 'Найменування розробника' },
  { id: 'created', label: 'Рік створення методики', format: String },
  {
    id: 'updated',
    label: 'Рік внесення змін до методики',
    format: (value: number | null) => (value ? String(value) : '---'),
  },
  {
    id: 'stoped',
    label: 'Рік припинення застосування методики',
    format: (value: number | null) => (value ? String(value) : '---'),
  },
  {
    id: 'registered',
    label: 'Дата прийняття рішення про державну реєстрацію',
    format: getDateStr,
  },
  {
    id: 'registered_changes',
    label: 'Дата прийняття рішення про державну реєстрацію змін до методики',
    format: (value: Date | null) => (value ? getDateStr(value) : '---'),
  },
  {
    id: 'stop_date',
    label: 'Дата прийняття рішення про припинення застосування методики',
    format: (value: Date | null) => (value ? getDateStr(value) : '---'),
  },
];

const privateColumns: Column[] = [
  {
    id: 'docs',
    label: 'Вкладені документи',
    format: (value: [string | null, string | null, string | null]) => (
      <>
        <b>{value[0]}</b>
        <br />
        {value[1]}
      </>
    ),
  },
  {
    id: 'change_row',
    label: 'Внести зміни',
    format: (value: string) => (
      <>
        <b>{value}</b>
      </>
    ),
  },
];

interface Data {
  number: number;
  code: string;
  type: [string, string];
  name: string;
  developer: string;
  created: number;
  updated: number | null;
  stoped: number | null;
  registered: Date;
  registered_changes: Date | null;
  stop_date: Date | null;
  docs?: [string | null, string | null, string | null];
  change_row?: string;
}

function createData(method: MethodDTO, index: number): Data {
  return {
    number: index,
    code: method.registration_code,
    type: [
      method.domainsOfMethod.typesOfMethods.name,
      method.domainsOfMethod.name,
    ],
    name: method.name,
    developer: method.author,
    created: method.year_creation,
    updated: method.year_making_changes,
    stoped: method.year_termination_application,
    registered: method.date_of_decision_on_state_registration,
    registered_changes:
      method.date_of_decision_on_state_registration_of_changes,
    stop_date: method.date_of_decision_to_terminate_the_application,
  };
}

const methodsFilter: Filter = {
  userId: undefined,
  page: 0,
  count: 10,
};

export default function MainTable() {
  const methods = useTypedSelector(loadMethods);
  const user = useTypedSelector(getUser);

  if (user.role === 'registrator') {
    // columns.push()
  }
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchMethodsData(methodsFilter));
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    methodsFilter.page = newPage;
    dispatch(fetchMethodsData(methodsFilter));
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {methods.methods.map((method, index) => {
              const row = createData(method, index + 1);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value !== 'string'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={methods.page}
        count={methods.totalPages}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Paper>
  );
}
