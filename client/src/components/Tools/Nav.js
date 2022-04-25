import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, ButtonGroup, Button, Switch } from '@mui/material';
import {
  Home,
  AccountCircle,
  Public,
  LogoutRounded,
  DarkMode,
  LightMode,
} from '@mui/icons-material';

export default function Nav(props) {
  const { logout, token, light, setLight } = props;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTheme = () => {
    setLight(!light);
  };

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: {
          mobile: 'none',
          tablet: 'flex',
          desktop: 'flex',
          wide: 'flex',
        },
        mb: '100px',
        backgroundColor: light ? '#a6c1ed' : '#2c4963',
        p: '10px',
        borderRadius: '5px',
      }}
    >
      <Box sx={{ mr: 'auto' }}>
        <Button
          startIcon={<Home />}
          variant="contained"
          size="small"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </Box>
      <Box>
        <ButtonGroup variant="contained">
          <Switch
            icon={<DarkMode />}
            checkedIcon={<LightMode />}
            checked={light}
            onChange={handleTheme}
          />
          {token && (
            <Button
              startIcon={<AccountCircle />}
              size="small"
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
          )}
          {token && (
            <Button
              startIcon={<Public />}
              size="small"
              onClick={() => navigate('/public')}
            >
              Public
            </Button>
          )}
          {token && (
            <Button
              startIcon={<LogoutRounded />}
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
}
