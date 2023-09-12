import React, {useEffect, useState} from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Text,
} from 'react-native-paper';
import Navegacion from './components/Navegacion';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
  },
};

type MessagesReceived = {
  emisor: {
    id: number;
    phone: string;
    fullName: string;
    dni: string;
  };
  message: {
    id: number;
    description: string;
  };
  latitude: number;
  longitude: number;
};

function App(): JSX.Element {
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(
    null,
  );
  const [messages, setMessages] = useState<MessagesReceived[]>([]);

  useEffect(() => {
    createHubConnection();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const createHubConnection = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5152/sendMessageHub')
      .configureLogging(LogLevel.Debug)
      .build();

    try {
      await connection.start().then(() => {
        console.log('Conexión establecida correctamente');
      });
    } catch (error) {
      console.log(error);
    }

    setHubConnection(connection);
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on(
        'ReceiveMessage',
        (message, emisor, latitude, longitude) => {
          setMessages(prevMessages => [
            ...prevMessages,
            {message, emisor, latitude, longitude},
          ]);
        },
      );
    }
  }, [hubConnection]);

  return (
    <PaperProvider theme={theme}>
      <Navegacion />
      {messages.map((m, i) => (
        <Text variant="bodyLarge" key={i}>
          {m.emisor.fullName} {m.message.description} {m.latitude} {m.longitude}
        </Text>
      ))}
    </PaperProvider>
  );
}

export default App;
