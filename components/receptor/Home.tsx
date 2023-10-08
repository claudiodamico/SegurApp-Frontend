import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View, Image} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from '../Spinner';
import {Button, IconButton, MD2Colors} from 'react-native-paper';
import {getColorAlert, getIconAlert} from '../../utils/colors';
import {format} from 'date-fns';

const Home = ({
  messages,
  setMessages,
}: {
  messages: MessageReceived[];
  setMessages: (messages: MessageReceived[]) => void;
}) => {
  const [position, setPosition] = useState<GeolocationResponse | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          fetchCurrentPosition();
        } else {
          const permissionResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (permissionResult === RESULTS.GRANTED) {
            fetchCurrentPosition();
          } else {
            ToastAndroid.show(
              'No se puede acceder a la ubicación',
              ToastAndroid.SHORT,
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    requestLocationPermission();
  }, []);

  const fetchCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setPosition(position);
      },
      error => {
        console.log(`Error al obtener la ubicación: ${error.message}`);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  if (!position) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Spinner />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          minZoomLevel={15}
          initialRegion={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            pinColor={MD2Colors.blue300}
            coordinate={{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }}
            title={'Tu ubicación'}
            description={'Esta es tu ubicación'}
          />
          {messages.map((message, i) => (
            <Marker
              pinColor={getColorAlert(message.message.description)}
              key={i}
              draggable
              coordinate={{
                latitude: message.latitude,
                longitude: message.longitude,
              }}
              onDragStart={() =>
                setMessages(messages.filter((v, index) => index != i))
              }
              title={message.message.description}
              description={
                format(message.occurredAt, 'dd/MM/yyyy kk:mm:ss') +
                ' - ' +
                message.emisor.fullName
              }>
              <IconButton
                icon={getIconAlert(message.message.description)}
                iconColor={getColorAlert(message.message.description)}
                size={35}
              />
            </Marker>
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
