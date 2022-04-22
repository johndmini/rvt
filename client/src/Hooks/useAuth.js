import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
