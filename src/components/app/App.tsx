import React from 'react';
import './App.css';

// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import store from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { StorageKey, AppRoute } from '../../common/enum/enums';
import { userActionCreator, metodActionCraetor } from '../../store/actions';

import NestedList from '../CheckBoxListItem';
import StickyHeadTable from '../Table';
import ColumnGroupingTable2 from '../Table2';
import { storage } from '../../services/services';
import Spinner from '../common/Spinner';
import { RootState } from '../../store/store';

const Routing = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const dispatch = useDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  const handleUserLogout = React.useCallback(
    () => dispatch(userActionCreator.logout()),
    [dispatch],
  );

  React.useEffect(() => {
    if (hasToken) {
      dispatch(userActionCreator.loadCurrentUser());
    }
  }, [hasToken, dispatch]);

  if (!hasUser && hasToken) {
    return <Spinner />;
  }
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<NestedList />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <Switch>
      <Route
        exact
        path={[AppRoute.LOGIN, AppRoute.REGISTRATION]}
        component={NestedList}
      />
    </Switch>
  );
};

export default Routing;
