import React, { useContext } from 'react';
import Nav from './components/Tools/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Public from './pages/Public';
import RequireAuth from './components/ProtectedRoutes/RequireAuth';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserProvider';

export default function App() {
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
      <Box>
        <Nav logout={logout} token={token} />
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
    </BrowserRouter>
  );
}
