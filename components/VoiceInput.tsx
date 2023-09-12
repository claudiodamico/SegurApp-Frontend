import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import Voice from '@react-native-voice/voice';
import {Button} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const VoiceRecognition: React.FC = () => {
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the voice recognition module
    Voice.onSpeechStart = () => {
      console.log('Speech started');
    };

    Voice.onSpeechRecognized = e => {
      console.log('Speech recognized:', e);
    };

    Voice.onSpeechEnd = () => {
      console.log('Speech ended');
    };

    Voice.onSpeechError = e => {};

    Voice.onSpeechResults = async (e: any) => {
      await Voice.stop();
      setIsListening(false);
      setRecognizedText(e.value[0]);
      Geolocation.getCurrentPosition(
        position => {
          axios({
            url: 'http://localhost:5152/api/message-users',
            method: 'POST',
            data: {
              emisorId: 1,
              message: e.value[0],
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          })
            .then(() => {
              ToastAndroid.show(
                'Mensaje enviado correctamente',
                ToastAndroid.SHORT,
              );
            })
            .catch(err => {
              ToastAndroid.show(
                'Error al enviar el mensaje: ' + err,
                ToastAndroid.SHORT,
              );
            });
        },
        error => {
          console.log(`Error al obtener la ubicación: ${error.message}`);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    return () => {
      // Cleanup and stop voice recognition when the component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const toggleListening = async () => {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        await Voice.start('es-Es');
        setIsListening(true);
      }
    } catch (e) {
      console.error('Voice recognition error:', e);
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Button
        mode="elevated"
        icon={isListening ? 'record-circle' : 'microphone'}
        onPress={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <Text
        style={{
          marginTop: 10,
        }}>
        {recognizedText}
      </Text>
    </View>
  );
};

export default VoiceRecognition;
