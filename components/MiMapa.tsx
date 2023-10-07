import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
// Import required components
import {SafeAreaView, StyleSheet, ToastAndroid, View} from 'react-native';
// Import Map and Marker
import MapView, {Marker} from 'react-native-maps';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import Spinner from './Spinner';

const MiMapa = () => {
  const [position, setPosition] = useState<GeolocationResponse | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          fetchCurrentPosition();

          Geolocation.watchPosition(
            pos => {
              setPosition(pos);
            },
            error => {
              console.log(error);
            },
          );
        } else {
          const permissionResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (permissionResult === RESULTS.GRANTED) {
            fetchCurrentPosition();
            while (true) {
              setTimeout(() => {
                fetchCurrentPosition();
              }, 5000);
            }
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
          initialRegion={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onUserLocationChange={fetchCurrentPosition}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }}
            onDragEnd={e =>
              console.log(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};
export default MiMapa;
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
