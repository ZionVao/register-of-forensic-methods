import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India1', 'IN', 1324171354, 3287263),
  createData('China2', 'CN', 1403500365, 9596961),
  createData('Italy3', 'IT', 60483973, 301340),
  createData('United States4', 'US', 327167434, 9833520),
  createData('Canada5', 'CA', 37602103, 9984670),
  createData('Australia6', 'AU', 25475400, 7692024),
  createData('Germany7', 'DE', 83019200, 357578),
  createData('Ireland8', 'IE', 4857000, 70273),
  createData('Mexico9', 'MX', 126577691, 1972550),
  createData('Japan10', 'JP', 126317000, 377973),
  createData('France11', 'FR', 67022000, 640679),
  createData('United Kingdom12', 'GB', 67545757, 242495),
  createData('Russia13', 'RU', 146793744, 17098246),
  createData('Nigeria14', 'NG', 200962417, 923768),
  createData('Brazil15', 'BR', 210147125, 8515767),
  createData('India16', 'IN', 1324171354, 3287263),
  createData('China17', 'CN', 1403500365, 9596961),
  createData('Italy18', 'IT', 60483973, 301340),
  createData('United States19', 'US', 327167434, 9833520),
  createData('Canada20', 'CA', 37602103, 9984670),
  createData('Australia21', 'AU', 25475400, 7692024),
  createData('Germany22', 'DE', 83019200, 357578),
  createData('Ireland23', 'IE', 4857000, 70273),
  createData('Mexico24', 'MX', 126577691, 1972550),
  createData('Japan25', 'JP', 126317000, 377973),
  createData('France26', 'FR', 67022000, 640679),
  createData('United Kingdom27', 'GB', 67545757, 242495),
  createData('Russia28', 'RU', 146793744, 17098246),
  createData('Nigeria29', 'NG', 200962417, 923768),
  createData('Brazil30', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: 'auto',
    marginTop: '15vh',
    height: '70vh',
    borderWidth: 2,
    borderColor: 'grey',
    borderStyle: 'solid',
  },
  tableCell: {
    borderRightStyle: 'solid',
    borderRightColor: 'grey',
    display: 'tableRowGroup',
  },
}));

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pagesCount, setPagesCount] = React.useState(
    Math.ceil(rows.length / rowsPerPage),
  );
  const [currentRows, setRows] = React.useState(rows.slice(0, rowsPerPage));

  const handleChangePage1 = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
    const lastInx =
      (newPage + 1) * rowsPerPage > rows.length
        ? rows.length
        : (newPage + 1) * rowsPerPage;
    setRows(rows.slice(newPage * rowsPerPage, lastInx));
  };

  const handleChangePage2 = (event: unknown, newPage: number) => {
    setPage(newPage);
    const lastInx =
      newPage * rowsPerPage > rows.length ? rows.length : newPage * rowsPerPage;
    setRows(rows.slice((newPage - 1) * rowsPerPage, lastInx));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const len = Number(event.target.value);
    setRowsPerPage(len);
    setPage(1);
    setPagesCount(Math.ceil(rows.length / len));
    setRows(rows.slice(0, len));
  };

  const classes = useStyles();

  React.useEffect(() => {
    console.log(page, rowsPerPage, currentRows);
  }, [rowsPerPage, page]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        sx={{ maxHeight: 'auto' }}
        className={classes.tableContainer}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.tableCell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={classes.tableCell}
                      >
                        {column.format && typeof value === 'number'
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage1}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
      <Pagination
        page={page}
        count={pagesCount}
        onChange={handleChangePage2}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Paper>
  );
}
