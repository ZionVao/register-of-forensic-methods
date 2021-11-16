import * as React from 'react';
import { AppRoute } from '../../common/enum/enums';
import { NavLink } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const NotFound = () => (
  <h2>
    <SentimentVeryDissatisfiedIcon />
    <span>404 Not Found</span>
    Go to
    <NavLink to={AppRoute.ROOT}> Home </NavLink>
    page
  </h2>
);

export default NotFound;
