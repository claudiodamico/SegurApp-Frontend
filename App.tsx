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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
  },
};

type User = {
  id: number;
  fullName: string;
  dni: string;
  email: string;
  phone: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
};

const setToken = async () => {
  try {
    const user = JSON.stringify({
      id: 1,
      fullName: 'Ciro Gargatagli',
      dni: '12345678',
      email: 'ciro@gmail.com',
      phone: '1112345678',
      role: {
        id: 1,
        name: 'Receptor',
        description: '',
      },
    });
    await AsyncStorage.setItem('session', user);
  } catch (error) {
    // Error saving data
  }
};

const getToken = async () => {
  try {
    const session = await AsyncStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  } catch (e) {
    // error reading value
  }
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

  const login = useCallback(async () => {
    setLoading(true);
    await setToken();
    fetchData();
    setLoading(false);
  }, []);

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
        user.role.name == 'Emisor' ? (
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
