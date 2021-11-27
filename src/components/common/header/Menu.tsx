import * as React from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import { AppRoute } from '../../../common/enum/enums';
import { useTypedSelector } from '../../../store/store';
import { getUser } from '../../../store/user/slice';

const menuTabs = {
  public: [
    { name: 'Методики', link: AppRoute.ROOT },
    { name: 'Пошук', link: AppRoute.SEARCH },
    { name: 'Вхід', link: AppRoute.LOGIN },
  ],
  admin: [
    { name: 'Реєстратори', link: AppRoute.REGISTRY },
    { name: 'Транзакції', link: AppRoute.TRANSACTION },
  ],
};

export default function Menu() {
  const { pathname } = useLocation();

  const getTab = (pathLink: string): number => {
    switch (pathLink) {
      case AppRoute.SEARCH: {
        return 1;
      }
      case AppRoute.LOGIN: {
        return 2;
      }
      case AppRoute.REGISTRY: {
        return user.role === 'admin' ? 3 : 0;
      }
      case AppRoute.TRANSACTION: {
        return user.role === 'admin' ? 4 : 0;
      }

      default: {
        return 0;
      }
    }
  };
  const user = useTypedSelector(getUser);

  const [value, setValue] = React.useState(getTab(pathname));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        {menuTabs.public.map((tab) => (
          <Tab label={tab.name} key={tab.name} href={tab.link} />
        ))}
        {user.role === 'admin' &&
          menuTabs.admin.map((tab) => (
            <Tab label={tab.name} key={tab.name} href={tab.link} />
          ))}
      </Tabs>
    </Box>
  );
}
