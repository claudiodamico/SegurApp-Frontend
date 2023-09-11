import React, {useEffect, useState} from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
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
};

function App(): JSX.Element {
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(
    null,
  );
  const [messages, setMessages] = useState<MessagesReceived[]>([]);

  useEffect(() => {
    createHubConnection();
  }, []);

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
      hubConnection.on('ReceiveMessage', (message, emisor) => {
        setMessages(prevMessages => [...prevMessages, {message, emisor}]);
      });
    }
  }, [hubConnection]);

  return (
    <PaperProvider theme={theme}>
      <Navegacion />
    </PaperProvider>
  );
}

export default App;
