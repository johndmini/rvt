import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, ButtonGroup, Button } from '@mui/material';
import {
  Home,
  AccountCircle,
  Public,
  LogoutRounded,
} from '@mui/icons-material';

export default function Nav(props) {
  const { logout, token } = props;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', mb: '100px' }}>
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
          {token && (
            <Button
              startIcon={<AccountCircle />}
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
          )}
          <Button startIcon={<Public />}>Public</Button>
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
