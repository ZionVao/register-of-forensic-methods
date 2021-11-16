import * as React from 'react';
import {
  Divider,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import validator from 'validator';

export default function LoginForm(params: {
  onLogin: (loginPayload: { email: string; password: string }) => void;
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailValid(true);
  };

  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
  };

  const handleLoginClick = () => {
    const isValid = isEmailValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);

    params.onLogin({ email, password });
    setIsLoading(false);
  };

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div">
          Login to your account
        </Typography>
        <Divider />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          error={!isEmailValid}
          onChange={emailChanged}
          onBlur={() => setIsEmailValid(validator.isEmail(email))}
        />

        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          error={!isPasswordValid}
          onChange={passwordChanged}
          onBlur={() => setIsPasswordValid(Boolean(password))}
        />
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          color="primary"
          loading={isLoading}
          loadingIndicator="Loading..."
          onClick={handleLoginClick}
        >
          Login
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
