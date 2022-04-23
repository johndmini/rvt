import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

import { Box, Button, Typography } from '@mui/material';
import { useNavigate, Routes, Route } from 'react-router-dom';

const userInputs = { username: '', password: '' };
const initSignUpInputs = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  firstname: '',
  lastname: '',
};

export default function Home(props) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(userInputs);
  const [signUpInputs, setSignUpInputs] = useState(initSignUpInputs);

  const { signup, login, light, errMsg } = props;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignUpInputs((prevState) => ({
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
                handleLoginChange={handleLoginChange}
                inputs={inputs}
                login={login}
                light={light}
                errMsg={errMsg}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Signup
                handleSignupChange={handleSignupChange}
                signUpInputs={signUpInputs}
                signup={signup}
                light={light}
                errMsg={errMsg}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}
