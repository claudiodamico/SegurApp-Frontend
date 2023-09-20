import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import Spinner from './Spinner';

const Register = ({goBack}: {goBack: () => void}) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const register = () => {
    setLoading(true);
    axios({
      url: 'http://10.0.2.2:5152/api/message-users',
      method: 'POST',
      data: {
        dni,
        password,
        phone,
        email,
      },
    })
      .then(() => {
        ToastAndroid.show('Se ha registrado correctamente', ToastAndroid.SHORT);
        goBack();
      })
      .catch(err => {
        ToastAndroid.show(
          'Error al registrarse el mensaje: ' + err,
          ToastAndroid.SHORT,
        );
      })
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Spinner />
  ) : (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Text variant="titleMedium"> Sign up to start sending alerts</Text>
      <View
        style={{
          width: '85%',
        }}>
        <TextInput
          label="DNI"
          value={dni}
          onChangeText={v => setDni(v)}
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={v => setPassword(v)}
          secureTextEntry
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={v => setPhone(v)}
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={v => setEmail(v)}
          style={{
            marginTop: 15,
          }}
        />
        <Button
          mode="contained"
          style={{marginTop: 20}}
          onPress={() => register()}>
          Sign Up
        </Button>
        <Button
          mode="outlined"
          style={{marginTop: 20}}
          onPress={() => goBack()}>
          Back
        </Button>
      </View>
    </View>
  );
};

export default Register;
