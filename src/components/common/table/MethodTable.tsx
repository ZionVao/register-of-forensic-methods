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
  Grid,
  Button,
} from '@mui/material';
import { MethodDTO } from '../../../common/dtos/method/MethodDTO';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { loadMethods } from '../../../store/method/slice';
import { fetchMethodsData } from '../../../store/method/actions';
import { getDateStr } from '../../../helpers/date/dayjs/dayjs';
import { getUser } from '../../../store/user/slice';
import { MethodFilter } from '../../../services/interfaces/interfaces';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../../common/enum/enums';
import { Search } from '../search/Search';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import * as uuid from 'uuid';

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
      <Button
        color="info"
        // onClick={handleClick}
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </Button>
    ),
  },
  {
    id: 'change_row',
    label: 'Внести зміни',
    format: (value: string) => (
      <Button
        color="secondary"
        // onClick={handleClick}
        startIcon={<EditIcon />}
        variant="contained"
      >
        Edit
      </Button>
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
  docs?: string[];
  change_row?: boolean;
}

function createData(method: MethodDTO, index: number, isPrivat: boolean): Data {
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
    registered: new Date(method.date_of_decision_on_state_registration),
    registered_changes: method.date_of_decision_on_state_registration_of_changes
      ? new Date(method.date_of_decision_on_state_registration_of_changes)
      : null,
    stop_date: method.date_of_decision_to_terminate_the_application
      ? new Date(method.date_of_decision_to_terminate_the_application)
      : null,
    docs: isPrivat
      ? [
          method.doc_certificate_of_approbation,
          method.doc_copy_of_implementation,
          method.doc_copy_of_method,
          method.doc_discount_card,
          method.doc_report_review,
        ]
      : undefined,
    change_row: isPrivat ? isPrivat : undefined,
  };
}

const methodsFilter: MethodFilter = {
  page: 1,
  count: 10,
};

export default function MethodTable() {
  const { pathname } = useLocation();

  const methods = useTypedSelector(loadMethods);
  const user = useTypedSelector(getUser);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchMethodsData(methodsFilter));
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    methodsFilter.page = newPage;
    dispatch(fetchMethodsData(methodsFilter));
  };

  return (
    <Grid
      container
      direction="column"
      //   justifyContent="center"
      alignItems="center"
    >
      {pathname === AppRoute.SEARCH && <Search />}

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
                {user.role === 'registrator' &&
                  privateColumns.map((column) => (
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
                const row = createData(
                  method,
                  index + 1 + methods.count * (methods.page - 1),
                  user.role === 'registrator',
                );
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uuid.v1()}>
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
                    {user.role === 'registrator' &&
                      privateColumns.map((column) => {
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
    </Grid>
  );
}
