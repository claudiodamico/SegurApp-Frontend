import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import Register from './Register';
import axios, {AxiosResponse} from 'axios';

const Login = ({login}: {login: (email: string, password: string) => void}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('login');

  const goBack = () => setPage('login');

  return page == 'login' ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Text variant="titleMedium">¡Inicia sesión para estar seguro!</Text>
      <View
        style={{
          width: '85%',
        }}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={v => setEmail(v)}
          inputMode="email"
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={v => setPassword(v)}
          secureTextEntry
          style={{
            marginTop: 15,
          }}
        />
        <Button
          mode="contained"
          style={{marginTop: 20}}
          onPress={() => login(email, password)}>
          Iniciar sesión
        </Button>
        <Button
          mode="outlined"
          style={{marginTop: 20}}
          onPress={() => setPage('register')}>
          Registrarse
        </Button>
      </View>
    </View>
  ) : (
    <Register goBack={goBack} />
  );
};

export default Login;
