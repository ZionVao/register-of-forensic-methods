import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { loadRegistrars } from '../../../store/registrar/slice';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { UserDTO } from '../../../common/dtos/user/UserDTO';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {
  fetchRegistrarsData,
  fetchUsersRelations,
} from '../../../store/registrar/actions';
import { UserFilter } from '../../../services/interfaces/interfaces';
import { AddressDTO } from '../../../common/dtos/address/AddressDTO';
import * as uuid from 'uuid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from '@mui/material';
import { deleteUser, sendUserInfo } from '../../../store/user/actions';

function Row(props: {
  row: UserDTO;
  organization: string;
  address: Omit<AddressDTO, 'id'>;
  authority: {
    code: number;
    id_adress: number;
    name: string;
  };
  onDelete: () => void;
}) {
  const dispatch = useTypedDispatch();

  const [openUserInfo, setOpenUserInfo] = React.useState(false);
  const [openDialogSend, setOpenDialogSend] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const handleSendUserInfo = () => {
    dispatch(sendUserInfo(props.row.id));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(props.row.id));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenUserInfo(!openUserInfo)}
          >
            {openUserInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.row.full_name}
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={() => setOpenDialogSend(true)}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          <Dialog
            open={openDialogSend}
            onClose={() => setOpenDialogSend(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Надіслати дані для входу Реєстратору?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Дані будуть надіслані на цю електрону адресу ${props.row.email} `}
                {'Ви впевнені?'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSendUserInfo} autoFocus>
                Так
              </Button>
              <Button onClick={() => setOpenDialogSend(false)}>Ні</Button>
            </DialogActions>
          </Dialog>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="outlined"
            onClick={() => setOpenDialogDelete(true)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Dialog
            open={openDialogDelete}
            onClose={() => setOpenDialogDelete(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Видалити Реєстратора?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {'Реєстратор та всі його дані будуть видалені. '}
                {'Ви впевнені?'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteUser} autoFocus>
                Так
              </Button>
              <Button onClick={() => setOpenDialogDelete(false)}>Ні</Button>
            </DialogActions>
          </Dialog>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openUserInfo} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Повна інформація
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Назва державного органу'}
                      </TableCell>
                      <TableCell>{props.organization}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Дата нарождення'}
                      </TableCell>
                      <TableCell>{props.row.date_of_birth}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Серія паспорта'}
                      </TableCell>
                      <TableCell>{props.row.series_passport}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Номер паспорта'}
                      </TableCell>
                      <TableCell>{props.row.passport_number}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Дата видачі паспорта'}
                      </TableCell>
                      <TableCell>
                        {props.row.date_of_issue_of_passport}
                      </TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Орган, що видав паспорт'}
                      </TableCell>
                      <TableCell>{`${props.authority.name} - ${props.authority.code}`}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {
                          'Реєстраційний номер облікової карти платника податків'
                        }
                      </TableCell>
                      <TableCell>{props.row.ITN}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'Електронна пошта'}
                      </TableCell>
                      <TableCell>{props.row.email}</TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const userFilter: UserFilter = {
  page: 1,
  count: 10,
};

export default function UserTable() {
  const registrars = useTypedSelector(loadRegistrars);

  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchUsersRelations());
    dispatch(fetchRegistrarsData(userFilter));
  }, [dispatch]);

  if (!registrars.organizations) {
    dispatch(fetchUsersRelations());
  }

  if (registrars.registrars.length === 0) {
    dispatch(fetchRegistrarsData(userFilter));
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    userFilter.page = newPage;
    dispatch(fetchRegistrarsData(userFilter));
  };

  if (
    registrars.registrars.length !== 0 &&
    Object.keys(registrars.organizations).length !== 0
  )
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ПІБ Реєстратора</TableCell>
              <TableCell align="right">Надіслати дані для входу</TableCell>
              <TableCell align="right">Видалити</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrars.registrars.map((row) => (
              <Row
                key={row.id}
                row={row}
                organization={
                  registrars.organizations[row.id_organizations].name
                }
                address={registrars.addresses[row.id_adress]}
                authority={
                  registrars.authorities[
                    row.id_authority_that_issued_the_passport
                  ]
                }
                onDelete={() => dispatch(fetchRegistrarsData(userFilter))}
              />
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={registrars.page}
          count={registrars.totalPages}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </TableContainer>
    );
  else return null;
}
