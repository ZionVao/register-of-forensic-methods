import {
  Avatar,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { getUser, UserRole } from '../../../store/user/slice';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../common/enum/enums';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../store/user/actions';

const getLinkByRole = (role: UserRole) => {
  switch (role) {
    case 'registrator':
      return AppRoute.CREATE_METHOD;
    case 'admin':
      return AppRoute.CREATE_REGISTRY;
    default:
      return AppRoute.ROOT;
  }
};

export default function UserCard() {
  const user = useTypedSelector(getUser);
  const dispatch = useTypedDispatch();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleSubmit = () => {
    setOpenDialog(false);
    dispatch(logout());
  };

  if (user.user) {
    return (
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            <IconButton component={Link} to={getLinkByRole(user.role)}>
              <AddIcon />
            </IconButton>
          </Avatar>
        }
        action={
          <>
            <IconButton color="primary" onClick={() => setOpenDialog(true)}>
              <LogoutIcon />
            </IconButton>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Вийти?'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {'Ви впевнені?'}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} autoFocus>
                  Так
                </Button>
                <Button onClick={() => setOpenDialog(false)}>Ні</Button>
              </DialogActions>
            </Dialog>
          </>
        }
        title={
          <Typography component="div" variant="h6">
            {user.role}
          </Typography>
        }
        subheader={user.user.full_name}
      />
    );
  } else return null;
}
