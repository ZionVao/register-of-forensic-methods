import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import { AppRoute } from '../../common/enum/enums';

interface TabFields {
  name: string;
  isPublic: boolean;
  link: string;
}

const menuTabs: TabFields[] = [
  { name: 'Методики', isPublic: true, link: AppRoute.ROOT },
  { name: 'Пошук', isPublic: true, link: AppRoute.SEARCH },
  { name: 'Вхід', isPublic: true, link: AppRoute.LOGIN },
  { name: 'Реєстратори', isPublic: false, link: AppRoute.REGISTRY },
  { name: 'Транзакції', isPublic: false, link: AppRoute.TRANSACTIONS },
];

export default function Menu() {
  const { pathname } = useLocation();

  const getTab = (path: string): number => {
    switch (path) {
      case AppRoute.SEARCH: {
        return 1;
      }
      case AppRoute.LOGIN: {
        return 2;
      }
      case AppRoute.REGISTRY: {
        return 3;
      }
      case AppRoute.TRANSACTIONS: {
        return 4;
      }

      default: {
        return 0;
      }
    }
  };

  const [value, setValue] = React.useState(getTab(pathname));
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
        {menuTabs &&
          menuTabs.map((tab) =>
            tab.isPublic ? <Tab label={tab.name} href={tab.link} /> : null,
          )}
      </Tabs>
    </Box>
  );
}
