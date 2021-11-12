import React from 'react';
import './App.css';

// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import store from './store/store';
import { Route, Switch, Redirect } from 'react-router-dom';

import { StorageKey, AppRoute } from '../../common/enum/enums';

import NestedList from '../common/CheckBoxListItem';
import ColumnGroupingTable from '../common/Table';
import { storage } from '../../services/services';
import Spinner from '../common/Spinner';
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from '../../store/store';
import Header from '../common/Header';

const Routing = () => {
  // const { user } = useTypedSelector((state) => ({
  //   user: state.user.user,
  // }));
  // const dispatch = useTypedDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = false; //Boolean(user);

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

  return (
    <>
      {!hasUser && <Header />}
      <Switch>
        {/* <Route
        exact
        path={[AppRoute.LOGIN, AppRoute.REGISTRATION]}
        render={}
      /> */}
        <Route
          render={(props) =>
            hasUser ? (
              <Redirect
                to={{
                  pathname: AppRoute.ROOT,
                  state: { from: props.location },
                }}
              />
            ) : (
              <ColumnGroupingTable />
            )
          }
        />
      </Switch>
    </>
  );
};

export default Routing;
