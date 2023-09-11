import * as React from 'react';
import {Appbar, BottomNavigation, Text} from 'react-native-paper';
import VoiceRecognition from './VoiceInput';

const Home = () => <VoiceRecognition />;

const NotificationsRoute = () => <Text>Notifications</Text>;

const Navegacion = () => {
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

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    notifications: NotificationsRoute,
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={routes[index].title} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default Navegacion;
