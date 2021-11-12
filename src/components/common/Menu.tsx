import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const menuTabs = {
  tab1: 'Методики',
  tab2: 'Пошук',
  tab3: 'Вхід',
};

export default function Menu() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label={menuTabs.tab1} />
        <Tab label={menuTabs.tab2} />
        <Tab label={menuTabs.tab3} />
      </Tabs>
    </Box>
  );
}
