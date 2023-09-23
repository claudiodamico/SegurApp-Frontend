import * as React from 'react';
import {Appbar, BottomNavigation, Text} from 'react-native-paper';
import VoiceRecognition from './VoiceInput';
import MiMapa from './MiMapa';

const Home = () => <VoiceRecognition />;

const NotificationsRoute = () => <Text>Notificaciones</Text>;
const MapRoute = () => <MiMapa />;

const Navegacion = ({logOut}: {logOut: () => void}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Inicio',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'notifications',
      title: 'Notificaciones',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
    {
      key: 'map',
      title: 'Mapa',
      focusedIcon: 'map-marker',
      unfocusedIcon: 'map-marker-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    notifications: NotificationsRoute,
    map: MapRoute,
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={routes[index].title} />
        <Appbar.Action icon="logout" onPress={() => logOut()} />
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
