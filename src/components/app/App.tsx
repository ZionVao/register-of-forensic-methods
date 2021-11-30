import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppRoute } from '../../common/enum/enums';

import Spinner from '../common/Spinner';
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from '../../store/store';
import Header from '../common/header/Header';
import { selectNotification, uiActions } from '../../store/ui/slice';
import { Alert, Snackbar } from '@mui/material';
import { SignPage } from '../common/sign/Sign';
import { Search } from '../common/search/Search';
import NotFound from '../common/NotFound';
import { getUser } from '../../store/user/slice';
import { CreateMethod } from '../common/createMethod/CreateMethod';
import MethodTable from '../common/table/MethodTable';
import { CreateUser } from '../common/createUser/CreateUser';
import UserTable from '../common/table/UserTable';
import { TransactionTable } from '../common/table/TransactionTable';
import { UpdateMethod } from '../common/update/UpdateMethod';

const Routing = () => {
  const notification = useTypedSelector(selectNotification);

  const user = useTypedSelector(getUser);

  const dispatch = useTypedDispatch();

  const handleClose = (event?: React.SyntheticEvent) => {
    dispatch(uiActions.clearNotification());
  };

  const notify = () => {
    if (notification) {
      const { status, message } = notification;

      return (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      );
    } else return null;
  };

  const notice = notify();

  return (
    <>
      <Header />
      {notice}
      <Switch>
        <Route
          exact
          path={[AppRoute.ROOT, AppRoute.SEARCH]}
          component={MethodTable}
        />
        <Route exact path={AppRoute.LOGIN} component={SignPage} />

        {user.role === 'admin' && (
          <>
            <Route path={AppRoute.CREATE_REGISTRY} component={CreateUser} />
            <Route path={AppRoute.REGISTRY} component={UserTable} />
            <Route path={AppRoute.TRANSACTION} component={TransactionTable} />
          </>
        )}

        {user.role === 'registrator' && (
          <>
            <Route path={AppRoute.CREATE_METHOD} component={CreateMethod} />
            <Route
              path={AppRoute.UPDATE_METHOD}
              render={({ match }) => (
                <UpdateMethod id={Number(match.params.id)} />
              )}
            />
          </>
        )}
        <Route path={AppRoute.ANY} component={NotFound} />
      </Switch>
    </>
  );
};

export default Routing;
