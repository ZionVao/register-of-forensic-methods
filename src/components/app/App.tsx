import React from 'react';
import './App.css';

// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import store from './store/store';
import { Route, Switch, Redirect } from 'react-router-dom';

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
import { CreateMethod } from '../common/create/CreateMethod';
import MethodTable from '../common/table/MethodTable';
import { CreateUser } from '../common/create/CreateUser';
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
            <Route
              exact
              path={AppRoute.CREATE_REGISTRY}
              component={CreateUser}
            />
            <Route exact path={AppRoute.REGISTRY} component={UserTable} />
            <Route
              exact
              path={AppRoute.TRANSACTION}
              component={TransactionTable}
            />
          </>
        )}

        {user.role === 'registrator' && (
          <>
            <Route
              exact
              path={AppRoute.CREATE_METHOD}
              component={CreateMethod}
            />
            <Route exact path={AppRoute.METHOD} component={UpdateMethod} />
          </>
        )}
        <Route path={AppRoute.ANY} exact component={NotFound} />
      </Switch>
    </>
  );
};

export default Routing;
