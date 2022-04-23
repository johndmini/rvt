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
  const { handleSignupChange, signUpInputs, signup, light, errMsg } = props;
  const inputProps = {
    style: { color: light ? 'black' : 'white' },
  };
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (signUpInputs.password !== signUpInputs.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    signup(signUpInputs);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        backgroundColor: light ? 'gray' : '#2c4963',
        m: '0 auto',
        p: '25px',
      }}
    >
      <Typography color="red">{errMsg}</Typography>
      <FormControl sx={{ backgroundColor: light ? 'white' : 'gray' }}>
        <TextField
          label="Username"
          name="username"
          required
          autoComplete="off"
          value={signUpInputs.username}
          inputProps={inputProps}
          onChange={handleSignupChange}
        />
        <TextField
          label="Password"
          name="password"
          required
          autoComplete="off"
          type="password"
          value={signUpInputs.password}
          inputProps={inputProps}
          onChange={handleSignupChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          required
          autoComplete="off"
          type="password"
          value={signUpInputs.confirmPassword}
          inputProps={inputProps}
          onChange={handleSignupChange}
        />
        <TextField
          label="Email"
          name="email"
          required
          autoComplete="off"
          value={signUpInputs.email}
          inputProps={inputProps}
          onChange={handleSignupChange}
        />
        <TextField
          label="First Name"
          name="firstname"
          required
          autoComplete="off"
          value={signUpInputs.firstname}
          inputProps={inputProps}
          onChange={handleSignupChange}
        />
        <TextField
          label="Last Name"
          name="lastname"
          required
          autoComplete="off"
          value={signUpInputs.lastname}
          inputProps={inputProps}
          onChange={handleSignupChange}
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
