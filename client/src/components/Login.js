import React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const { handleChange, inputs, login } = props;
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        m: '0 auto',
      }}
    >
      <Typography>This is the login page</Typography>
      <TextField
        label="Username"
        name="username"
        required
        value={inputs.username}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        required
        value={inputs.password}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Button variant="contained" onClick={() => navigate('/signup')}>
        Not a member? Sign up here
      </Button>
    </Box>
  );
}
