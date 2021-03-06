import * as React from 'react';
import {
  Collapse,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { loadRegistrars } from '../../../store/registrar/slice';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { UserDTO } from '../../../common/dtos/user/UserDTO';

import {
  activateUser,
  deactivateUser,
  fetchRegistrarsData,
  fetchUsersRelations,
} from '../../../store/registrar/actions';
import { UserFilter } from '../../../services/interfaces/interfaces';
import { AddressDTO } from '../../../common/dtos/address/AddressDTO';
import * as uuid from 'uuid';
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

  const handleActivateUser = () => {
    dispatch(activateUser(props.row.id));
  };

  const handleDeactivateUser = () => {
    dispatch(deactivateUser(props.row.id));
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
              {'?????????????????? ???????? ?????? ?????????? ???????????????????????'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`???????? ???????????? ?????????????????? ???? ???? ?????????????????? ???????????? ${props.row.email} `}
                {'???? ?????????????????'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSendUserInfo} autoFocus>
                ??????
              </Button>
              <Button onClick={() => setOpenDialogSend(false)}>????</Button>
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
              {'???????????????? ???????????????????????'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {'???????????????????? ???? ?????? ???????? ???????? ???????????? ????????????????. '}
                {'???? ?????????????????'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteUser} autoFocus>
                ??????
              </Button>
              <Button onClick={() => setOpenDialogDelete(false)}>????</Button>
            </DialogActions>
          </Dialog>
        </TableCell>
        <TableCell align="right">
          {props.row.is_activate && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDeactivateUser}
              startIcon={<BlockIcon />}
            >
              Deactivate
            </Button>
          )}

          {props.row.is_activate === false && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleActivateUser}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Activate
            </Button>
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openUserInfo} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                ?????????? ????????????????????
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'?????????? ???????????????????? ????????????'}
                      </TableCell>
                      <TableCell>{props.organization}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'???????? ????????????????????'}
                      </TableCell>
                      <TableCell>{props.row.date_of_birth}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'?????????? ????????????????'}
                      </TableCell>
                      <TableCell>{props.row.series_passport}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'?????????? ????????????????'}
                      </TableCell>
                      <TableCell>{props.row.passport_number}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'???????? ???????????? ????????????????'}
                      </TableCell>
                      <TableCell>
                        {props.row.date_of_issue_of_passport}
                      </TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'??????????, ???? ?????????? ??????????????'}
                      </TableCell>
                      <TableCell>{`${props.authority.name} - ${props.authority.code}`}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {
                          '?????????????????????????? ?????????? ?????????????????? ?????????? ???????????????? ????????????????'
                        }
                      </TableCell>
                      <TableCell>{props.row.ITN}</TableCell>
                    </TableRow>
                  }
                  {
                    <TableRow key={uuid.v1()}>
                      <TableCell component="th" scope="row">
                        {'???????????????????? ??????????'}
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
              <TableCell>?????? ??????????????????????</TableCell>
              <TableCell align="right">?????????????????? ???????? ?????? ??????????</TableCell>
              <TableCell align="right">????????????????</TableCell>
              <TableCell align="right">???????????????????? ????????????</TableCell>
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
