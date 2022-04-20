import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

import { Box, Button, Typography } from '@mui/material';
import { useNavigate, Routes, Route } from 'react-router-dom';

const userInputs = { username: '', password: '' };

export default function Home(props) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(userInputs);

  const { signup, login } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ mb: '30px' }}>
        <Typography>Welcome to Rock The Vote</Typography>
        <Button variant="outlined" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outlined" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Box>
      <Box>
        <Routes>
          <Route
            path="login"
            element={
              <Login
                handleChange={handleChange}
                inputs={inputs}
                login={login}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Signup
                handleChange={handleChange}
                inputs={inputs}
                signup={signup}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}
