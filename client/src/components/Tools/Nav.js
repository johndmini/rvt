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
      }}
    >
      <Box sx={{ mr: 'auto' }}>
        <Button
          startIcon={<Home />}
          variant="outlined"
          size="small"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </Box>
      <Box>
        <ButtonGroup size="small">
          <Switch
            icon={<DarkMode />}
            checkedIcon={<LightMode />}
            checked={light}
            onChange={handleTheme}
          />
          {token && (
            <Button
              startIcon={<AccountCircle />}
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
          )}
          {token && (
            <Button startIcon={<Public />} onClick={() => navigate('/public')}>
              Public
            </Button>
          )}
          {token && (
            <Button startIcon={<LogoutRounded />} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
}
