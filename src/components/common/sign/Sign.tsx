import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedDispatch } from '../../../store/store';
import { login } from '../../../store/user/actions';
import { AppRoute } from '../../../common/enum/enums';
import { Grid } from '@mui/material';
import LoginForm from './LoginForm';

export const SignPage = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();

  const handleLogin = React.useCallback(
    (loginPayload: { email: string; password: string }) =>
      dispatch(login(loginPayload)),
    [dispatch],
  );

  const getScreen = (path: string) => {
    switch (path) {
      case AppRoute.LOGIN: {
        return <LoginForm onLogin={handleLogin} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item sx={{ width: 500 }}>
        {getScreen(pathname)}
      </Grid>
    </Grid>
  );
};
