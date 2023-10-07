import React, {useCallback, useEffect, useState} from 'react';

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Text,
} from 'react-native-paper';
import Navegacion from './components/Navegacion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import NavegationReceptor from './components/receptor/NavigationReceptor';
import Spinner from './components/Spinner';
import {View} from 'react-native';
import axios, {AxiosError, AxiosResponse} from 'axios';
import jwt from 'jwt-decode'; // import dependency
import {sha256} from 'react-native-sha256';
import {getToken, setToken} from './utils/react-storage';
import {ToastAndroid} from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
  },
};

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const user = await getToken();
    setUser(user);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    axios({
      url: 'http://10.0.2.2:5152/api/user/Login',
      method: 'POST',
      data: {
        user: email,
        password: await sha256(password),
      },
    })
      .then((res: AxiosResponse<{message: string; jwt: string}>) => {
        const jwtDecoded = jwt(res.data.jwt) as {
          User: string;
          exp: number;
          aud: string;
          uss: string;
          nbf: number;
        };
        const userLogged = JSON.parse(jwtDecoded.User);
        setUser(userLogged);
        setToken(userLogged);
      })
      .catch((err: AxiosError<{message: string; jwt: string}>) => {
        ToastAndroid.show(
          err.response?.data.message ||
            'En este momento la aplicación no está disponible',
          ToastAndroid.SHORT,
        );
      })
      .finally(() => setLoading(false));
  };

  const logOut = useCallback(async () => {
    setLoading(true);
    await AsyncStorage.removeItem('session');
    setUser(null);
    setLoading(false);
  }, []);

  return (
    <PaperProvider theme={theme}>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Spinner />
        </View>
      ) : user ? (
        user.RoleId == 1 ? (
          <Navegacion logOut={logOut} />
        ) : (
          <NavegationReceptor logOut={logOut} />
        )
      ) : (
        <Login login={login} />
      )}
    </PaperProvider>
  );
}

export default App;
