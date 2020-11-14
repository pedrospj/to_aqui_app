import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { Text } from 'react-native';
import * as Location from 'expo-location';
import { Button } from '@ui-kitten/components';

const Meetings = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let locations = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      //   console.log(locations, 'locations');
      setLocation(locations);
    })();
  }, []);

  return (
    <Container>
      <Text>Meetings</Text>
      <Button onPress={handleStartLocation}>
        Iniciar Geolocalizacao Background
      </Button>

      <Button status="danger" onPress={handleStoptLocation}>
        Parar Geolocalizacao Background
      </Button>

      <Button status="danger" onPress={handleHasStarted}>
        Verificar Geolocalizacao Background
      </Button>

      <Text>{errorMsg}</Text>
    </Container>
  );
};

export default Meetings;
