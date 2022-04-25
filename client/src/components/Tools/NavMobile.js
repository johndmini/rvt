import React, { useState } from 'react';

import { Box, Menu, MenuItem, Fade, IconButton, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  AccountCircle,
  Public,
  LogoutRounded,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
} from '@mui/icons-material';

export default function NavMobile(props) {
  const { logout, token, light, setLight } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleHome = () => {
    setAnchorEl(null);
    navigate('/');
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handlePublic = () => {
    setAnchorEl(null);
    navigate('/public');
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/');
  };

  const handleTheme = () => {
    setLight(!light);
  };

  const MenuSx = {
    color: light ? 'black' : '#1976d2',
  };

  return (
    <Box
      sx={{
        display: {
          mobile: 'flex',
          tablet: 'none',
          desktop: 'none',
          wide: 'none',
        },
        backgroundColor: light ? '#a6c1ed' : '#2c4963',
        borderRadius: '5px',
        mb: '50px',
      }}
    >
      <Box sx={{ mr: 'auto' }}>
        <IconButton
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="primary"
          size="300px"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleHome} sx={MenuSx}>
            <Home /> Home
          </MenuItem>
          {token && (
            <MenuItem onClick={handleProfile} sx={MenuSx}>
              <AccountCircle /> Profile
            </MenuItem>
          )}
          {token && (
            <MenuItem onClick={handlePublic} sx={MenuSx}>
              <Public />
              Public
            </MenuItem>
          )}
          {token && (
            <MenuItem onClick={handleLogout} sx={MenuSx}>
              <LogoutRounded />
              Logout
            </MenuItem>
          )}
        </Menu>
      </Box>
      <Box>
        <Switch
          icon={<DarkMode />}
          checkedIcon={<LightMode />}
          checked={light}
          onChange={handleTheme}
        />
      </Box>
    </Box>
  );
}
