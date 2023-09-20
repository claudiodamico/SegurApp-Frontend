import * as React from 'react';
import {Appbar, BottomNavigation, Text} from 'react-native-paper';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import Home from './Home';

const Notifications = () => <Text>Notifications</Text>;

const NavegationReceptor = ({logOut}: {logOut: () => void}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);
  const [hubConnection, setHubConnection] =
    React.useState<HubConnection | null>(null);
  const [messages, setMessages] = React.useState<MessageReceived[]>([]);

  React.useEffect(() => {
    if (!hubConnection) {
      createHubConnection();
    }

    return () => {
      hubConnection?.stop();
      setHubConnection(null);
    };
  }, []);

  const createHubConnection = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://10.0.2.2:5152/sendMessageHub')
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

  React.useEffect(() => {
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
    <>
      <Appbar.Header>
        <Appbar.Content title={routes[index].title} />
        <Appbar.Action icon="logout" onPress={() => logOut()} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={({route, jumpTo}) => {
          switch (route.key) {
            case 'home':
              return <Home messages={messages} />;
            case 'notifications':
              return <Notifications />;
          }
        }}
      />
    </>
  );
};

export default NavegationReceptor;
