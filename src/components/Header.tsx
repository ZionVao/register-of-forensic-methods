import * as React from 'react';
import {
  Grid,
  Box,
  Paper,
  CardMedia,
  Card,
  CardHeader,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const logo = '/head.png';

export default function Header() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="100"
            width="auto"
            src={logo}
            title="Contemplative Reptile"
          />
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </Card>
  );
}

// <Box sx={{ flexGrow: 1 }}>
//   <Grid container spacing={3}>
//     <Grid item xs>
//       <Item>
//         <CardMedia
//           component="img"
//           alt="Contemplative Reptile"
//           height="100"
//           width="auto"
//           src={logo}
//           title="Contemplative Reptile"
//         />
//       </Item>
//     </Grid>
//     <Grid item xs={6}>
//       <Item>xs=6</Item>
//     </Grid>
//     <Grid item xs>
//       <Item>xs</Item>
//     </Grid>
//   </Grid>
// </Box>
