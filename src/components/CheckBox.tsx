import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Checkbox, FormControlLabel } from '@mui/material';

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);
  // const {checkedIds} = useSelector(state=>({checkedIds: state.}))

  const dispatch = useDispatch();

  return <Box></Box>;
}
