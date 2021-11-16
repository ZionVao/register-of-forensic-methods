import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { Link, MemoryRouter, Route } from 'react-router-dom';
import { MetodDTO } from '../../common/dtos/metod/MetodDTO';
import { Filter } from '../../services/metod/metod.service';
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from '../../store/store';
import { loadMetods } from '../../store/metod/slice';
import { fetchMetodsData } from '../../store/metod/actions';
import { getDateStr } from '../../helpers/date/dayjs/dayjs';

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
    | 'stop_date';
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
}

function createData(metod: MetodDTO, index: number): Data {
  return {
    number: index,
    code: metod.registration_code,
    type: [
      metod.domainsOfMethod.typesOfMethods.name,
      metod.domainsOfMethod.name,
    ],
    name: metod.name,
    developer: metod.author,
    created: metod.year_creation,
    updated: metod.year_making_changes,
    stoped: metod.year_termination_application,
    registered: metod.date_of_decision_on_state_registration,
    registered_changes: metod.date_of_decision_on_state_registration_of_changes,
    stop_date: metod.date_of_decision_to_terminate_the_application,
  };
}

const metodsFilter: Filter = {
  userId: undefined,
  from: 0,
  count: 10,
};

export default function ColumnGroupingTable() {
  const metods = useTypedSelector(loadMetods);

  const [page, setPage] = React.useState(1);
  const [pagesCount, setPagesCount] = React.useState(1);

  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchMetodsData(metodsFilter));
  }, [dispatch]);

  const handleMetodsLoad = (filtersPayload: Filter) => {
    dispatch(fetchMetodsData(filtersPayload));
  };

  // handleMetodsLoad(metodsFilter);

  // const toggleShowMetods = () => {
  //   // metodsFilter.userId = showOwnPosts ? undefined : userId;
  //   metodsFilter.from = 0;
  //   handleMetodsLoad(metodsFilter);
  //   metodsFilter.from = metodsFilter.count; // for the next scroll
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
            {metods.metods.map((metod, index) => {
              const row = createData(metod, index + 1);
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
        page={page}
        count={pagesCount}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Paper>
  );
}
