import React from 'react';
import './App.css';

// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import store from './store/store';
import { Route, Switch, Redirect } from 'react-router-dom';

import { StorageKey, AppRoute } from '../../common/enum/enums';

import NestedList from '../common/search/CheckBoxListItem';
import ColumnGroupingTable from '../common/mainTable/Table';
import { storage } from '../../services/services';
import Spinner from '../common/Spinner';
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from '../../store/store';
import Header from '../common/header/Header';
import { selectNotification, uiActions } from '../../store/ui/slice';
import { Alert, Snackbar } from '@mui/material';
import BasicCard from '../common/sign/LoginForm';
import { SignPage } from '../common/sign/Sign';
import { Search } from '../common/search/Search';
import NotFound from '../common/NotFound';
import { getUser, UserRole } from '../../store/user/slice';
import { CreateMethod } from '../common/create/CreateMethod';

const Routing = () => {
  const notification = useTypedSelector(selectNotification);

  const user = useTypedSelector(getUser);

  // const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));

  // const handleUserLogout = React.useCallback(
  //   () => dispatch(userActionCreator.logout()),
  //   [dispatch],
  // );

  // React.useEffect(() => {
  //   if (hasToken) {
  //     dispatch(userActionCreator.loadCurrentUser());
  //   }
  // }, [hasToken, dispatch]);

  // if (!hasUser && hasToken) {
  //   return <Spinner />;
  // }
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<NestedList />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  const dispatch = useTypedDispatch();

  const handleClose = (event?: React.SyntheticEvent) => {
    dispatch(uiActions.clearNotification());
  };

  // const handleCleanNotification = React.useCallback(() => {
  //   console.log('d');
  //   dispatch(cleanNotification);
  // }, [dispatch]);

  const notify = () => {
    if (notification) {
      const { status, message } = notification;
      // dispatch(uiActions.clearNotification());

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
        <Route exact path={AppRoute.ROOT} component={CreateMethod} />
        <Route exact path={AppRoute.LOGIN} component={SignPage} />
        <Route exact path={AppRoute.SEARCH} component={Search} />

        {user.role === 'admin' && (
          <>
            <Route exact path={AppRoute.REGISTRY} component={Search} />
            <Route exact path={AppRoute.TRANSACTION} component={Search} />
          </>
        )}

        {user.role === 'registrator' && (
          <>
            <Route exact path={AppRoute.METHOD} component={CreateMethod} />
          </>
        )}
        <Route path={AppRoute.ANY} exact component={NotFound} />
      </Switch>
    </>
  );
};

export default Routing;
