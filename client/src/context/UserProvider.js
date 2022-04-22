import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

//axios interceptor
const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    issues: [],
  };
  const [userState, setUserState] = useState(initState);
  const [userIssues, setUserIssues] = useState([]);

  // signup function
  const signup = (credentials) => {
    axios
      .post('/auth/signup', credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUserState((prevState) => ({
          ...prevState,
          user: res.data.user,
          token: res.data.token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  // login function
  const login = (credentials) => {
    axios
      .post('/auth/login', credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUserState((prevState) => ({
          ...prevState,
          user: res.data.user,
          token: res.data.token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  // logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState((prevState) => ({
      ...prevState,
      user: {},
      token: '',
      issues: [],
    }));
  };

  // add issue function with interceptor
  const addIssue = (issue) => {
    userAxios
      .post('/api/issues', issue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  // edit issue function with interceptor
  const editIssue = (id, updateIssue) => {
    userAxios
      .put(`/api/issues/${id}`, updateIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id === id ? res.data : issue
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  // delete issue function with interceptor
  const deleteIssue = (id) => {
    userAxios
      .delete(`/api/issues/${id}`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.filter((issue) => issue._id !== id),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  // get issues created by user
  const getMyIssues = () => {
    userAxios
      .get(`/api/issues/user/${userState.user._id}`)
      .then((res) => setUserIssues(res.data))
      .catch((err) => console.log(err.response.data.errMsg));
  };

  useEffect(() => {
    getMyIssues();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  return (
    <UserContext.Provider
      value={{
        ...userState,
        userIssues,
        userAxios,
        signup,
        login,
        logout,
        addIssue,
        editIssue,
        deleteIssue,
        getMyIssues,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
