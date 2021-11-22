import { Avatar, CardHeader, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';
import { useTypedSelector } from '../../../store/store';
import { getUser, UserRole } from '../../../store/user/slice';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../common/enum/enums';

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

  if (user.user) {
    return (
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            <IconButton
              aria-label="settings"
              component={Link}
              to={getLinkByRole(user.role)}
            >
              <AddIcon />
            </IconButton>
          </Avatar>
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
