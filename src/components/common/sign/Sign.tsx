import * as React from 'react';
import { useLocation } from 'react-router-dom';
// import { AppRoute } from 'src/common/enums/enums';
// import { profileActionCreator } from 'src/store/actions';
// import { Grid, Image } from 'src/components/common/common';
// import { LoginForm, RegistrationForm } from './components/components';

import { useTypedDispatch } from '../../../store/store';
import { login, register } from '../../../store/user/actions';
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

  // const handleRegister = React.useCallback(
  //   (registerPayload: { email: string; password: string; username: string }) =>
  //     dispatch(register(registerPayload)),
  //   [dispatch],
  // );

  const getScreen = (path: string) => {
    switch (path) {
      case AppRoute.LOGIN: {
        return <LoginForm onLogin={handleLogin} />;
      }
      // case AppRoute.REGISTRATION: {
      //   return <RegistrationForm onRegister={handleRegister} />;
      // }
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
