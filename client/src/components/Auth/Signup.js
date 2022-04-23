import React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const { handleChange, inputs, signup, light } = props;
  const inputProps = {
    style: { color: light ? 'black' : 'white' },
  };
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
      <FormControl sx={{ backgroundColor: light ? 'white' : 'gray' }}>
        <TextField
          label="Username"
          name="username"
          value={inputs.username}
          inputProps={inputProps}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          value={inputs.password}
          inputProps={inputProps}
          onChange={handleChange}
        />
      </FormControl>
      <ButtonGroup
        variant="contained"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Button onClick={handleSignup}>Signup</Button>
        <Button onClick={() => navigate('/login')}>
          Already a member? Login Here
        </Button>
      </ButtonGroup>
    </Box>
  );
}
