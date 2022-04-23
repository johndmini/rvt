import React from 'react';

import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const { handleLoginChange, inputs, login, light, errMsg } = props;
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
      <Typography color="red">{errMsg}</Typography>
      <TextField
        label="Username"
        name="username"
        required
        autoComplete="off"
        value={inputs.username}
        onChange={handleLoginChange}
        inputProps={{ style: { color: light ? 'black' : 'white' } }}
        sx={{ backgroundColor: light ? 'white' : 'gray' }}
      />
      <TextField
        label="Password"
        name="password"
        required
        type="password"
        value={inputs.password}
        onChange={handleLoginChange}
        inputProps={{ style: { color: light ? 'black' : 'white' } }}
        sx={{ backgroundColor: light ? 'white' : 'gray' }}
      />
      <ButtonGroup
        variant="contained"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={() => navigate('/signup')}>
          Not a member? Sign up here
        </Button>
      </ButtonGroup>
    </Box>
  );
}
