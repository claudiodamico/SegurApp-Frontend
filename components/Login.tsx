import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import Register from './Register';

const Login = ({login}: {login: () => void}) => {
  const [dni, setDni] = useState('');
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
      <Text variant="titleMedium"> Sign in to start issuing alerts</Text>
      <View
        style={{
          width: '85%',
        }}>
        <TextInput
          mode="outlined"
          label="DNI"
          value={dni}
          onChangeText={v => setDni(v)}
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
          onPress={() => login()}>
          Sign In
        </Button>
        <Button
          mode="outlined"
          style={{marginTop: 20}}
          onPress={() => setPage('register')}>
          Sign Up
        </Button>
      </View>
    </View>
  ) : (
    <Register goBack={goBack} />
  );
};

export default Login;
