import React, { useContext } from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Public from './pages/Public';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
                <Profile
                  user={user}
                  addIssue={addIssue}
                  deleteIssue={deleteIssue}
                  userIssues={userIssues}
                  editIssue={editIssue}
                />
              ) : (
                <Home signup={signup} login={login} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              !token ? (
                <Home signup={signup} login={login} />
              ) : (
                <Profile
                  user={user}
                  addIssue={addIssue}
                  deleteIssue={deleteIssue}
                  userIssues={userIssues}
                  editIssue={editIssue}
                />
              )
            }
          />
          <Route
            path="/public"
            element={
              <Public
                userAxios={userAxios}
                user={user}
              />
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
