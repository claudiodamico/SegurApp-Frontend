import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import Spinner from './Spinner';
import {sha256} from 'react-native-sha256';

const Register = ({goBack}: {goBack: () => void}) => {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    axios({
      url: 'http://10.0.2.2:5152/api/user',
      method: 'POST',
      data: {
        fullName,
        dni,
        password: await sha256(password),
        phone,
        email,
      },
    })
      .then(() => {
        ToastAndroid.show('Se ha registrado correctamente', ToastAndroid.SHORT);
        goBack();
      })
      .catch(err => {
        ToastAndroid.show('Error al registrarse: ' + err, ToastAndroid.SHORT);
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
      <Text variant="titleMedium">
        {' '}
        Registrate para comenzar a enviar alertas
      </Text>
      <View
        style={{
          width: '85%',
        }}>
        <TextInput
          label="Nombre completo"
          value={fullName}
          onChangeText={v => setFullName(v)}
          inputMode="text"
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="DNI"
          value={dni}
          onChangeText={v => setDni(v)}
          inputMode="numeric"
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={v => setPassword(v)}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Teléfono"
          value={phone}
          onChangeText={v => setPhone(v)}
          inputMode="tel"
          style={{
            marginTop: 15,
          }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={v => setEmail(v)}
          inputMode="email"
          style={{
            marginTop: 15,
          }}
        />
        <Button
          mode="contained"
          style={{marginTop: 20}}
          onPress={() => register()}>
          Registrarse
        </Button>
        <Button
          mode="outlined"
          style={{marginTop: 20}}
          onPress={() => goBack()}>
          Volver
        </Button>
      </View>
    </View>
  );
};

export default Register;
