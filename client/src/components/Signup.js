import React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const { handleChange, inputs, signup } = props;
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(inputs);
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
      <Typography>This is the signup page</Typography>
      <TextField
        label="Username"
        name="username"
        value={inputs.username}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSignup}>
        Signup
      </Button>
      <Button variant="contained" onClick={() => navigate('/login')}>
        Already a member? Login Here
      </Button>
    </Box>
  );
}
