import React, { useContext, useState } from 'react';
import Nav from './components/Tools/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Public from './pages/Public';
import RequireAuth from './components/ProtectedRoutes/RequireAuth';

import { themeDark, themeLight } from './Styles/Styles';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserProvider';

export default function App() {
  const [light, setLight] = useState(true);
  const {
    signup,
    login,
    user,
    token,
    logout,
    addIssue,
    deleteIssue,
    userIssues,
    editIssue,
    userAxios,
    getMyIssues,
  } = useContext(UserContext);

  return (
    <BrowserRouter>
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <Box>
          <Nav logout={logout} token={token} light={light} setLight={setLight} />
          <Routes>
            <Route
              path="/*"
              element={
                token ? (
                  <Navigate to="/profile" />
                ) : (
                  <Home user={user} signup={signup} login={login} />
                )
              }
            />
            <Route element={<RequireAuth />}>
              <Route
                path="/profile"
                element={
                  <Profile
                    user={user}
                    addIssue={addIssue}
                    deleteIssue={deleteIssue}
                    userIssues={userIssues}
                    editIssue={editIssue}
                    getMyIssues={getMyIssues}
                  />
                }
              />
              <Route
                path="/public"
                element={<Public userAxios={userAxios} user={user} />}
              />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}
