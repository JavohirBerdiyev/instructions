import { useEffect, useRef, useState } from 'react';
import http from '../http';
import { setToken } from 'store/auth/sessionSlice';
import store from 'store';

export function logOut() {
  sessionStorage.removeItem('client-token');
  sessionStorage.removeItem('permissions');
}

export const useAuthOne = (email, password) => {
  const isRun = useRef(false);
  const [isLogin, setIsLogin] = useState(false);


  const login = async () => {
    try {
      const response = await http.post("/operator/login", { email, password });

      if (response.data.data.accessToken) {
        setIsLogin(true);

        sessionStorage.setItem('client-token', response.data.data.accessToken);
        store.dispatch(setToken(response.data.data.accessToken));
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error', error);
    }
  };

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const loginWithStoredCredentials = async () => {
      try {
        await login();
      } catch (error) {
        console.error('Authentication error', error);
      }
    };

    loginWithStoredCredentials();
  }, [login]);

  return [isLogin];
};



const loginPost = async (data) => {
  try {
    const response = await http.post("/operator/login", data);
    return response.data;
  }catch (error) {
    // Handle error appropriately
    throw error
  }
}


const LoginService = {
  loginPost
};

export default LoginService;