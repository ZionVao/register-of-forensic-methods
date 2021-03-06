import * as React from 'react';
import {
  Box,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

import Menu from './Menu';
import UserCard from './UserCard';
import head from './head.png';

const headerInfo = {
  logo: head,
  title: 'МІНІСТЕРСТВО ЮСТИЦІЇ УКРАЇНИ',
  subheader: 'Реєстр методик проведення судових експертиз',
};

export default function Header() {
  return (
    <Card
      sx={{
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          alt={headerInfo.title}
          sx={{ width: 142, height: 90 }}
          src={headerInfo.logo}
          title={headerInfo.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {headerInfo.title}
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {headerInfo.subheader}
            </Typography>
            <Menu />
          </CardContent>
        </Box>
      </Box>
      <UserCard />
    </Card>
  );
}
