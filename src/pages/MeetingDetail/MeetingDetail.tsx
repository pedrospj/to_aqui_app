import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { Text, Button, Spinner, Modal, Card } from '@ui-kitten/components';
import { StackParamList } from '../../navigation/routes';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
import { getMeetingById } from '../../services/meetingService';
import { Meeting } from '../../interfaces/Meeting';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import * as Location from 'expo-location';
import { sendGeolocation } from '../../services/locationService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../store/user/types';

const states = {
  idle: 'IDLE',
  loading: 'LOADING',
  loadingGeo: 'GEO_LOADING',
  error: 'ERROR',
  geoError: 'GEO_ERROR',
};

const formatDate = (dateStr: string) => {
  const [date, timeStr] = dateStr.split(' ');
  const time = timeStr.split(':');
  return `${date} às ${time[0]}:${time[1]}`;
};

const LoadingIcon = () => (
  <View>
    <Spinner size="small" status="basic" />
  </View>
);

const MeetingDetail = () => {
  const { uid } = useSelector<RootState, UserState>((state) => state.user);
  const route = useRoute<RouteProp<StackParamList, 'MeetingDetail'>>();
  const [dataState, setDataState] = useState(states.loading);
  const [meeting, setMeeting] = useState<Meeting>();
  const { meetingId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMeeting = async () => {
      setDataState(states.loading);
      const response = await getMeetingById(meetingId);
      console.log(response);
      setMeeting(response);
      setDataState(states.idle);
    };
    fetchMeeting();
  }, [meetingId]);

  const handleSendLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setDataState(states.geoError);
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    console.log(location, 'deu');

    try {
      setDataState(states.loadingGeo);
      await sendGeolocation({
        meetingId,
        lat: location.coords.latitude,
        long: location.coords.longitude,
        userId: uid,
      });
      setDataState(states.idle);
      navigation.goBack();
    } catch (err) {
      setDataState(states.error);
    }
  };

  if (dataState === states.loading || !meeting) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#1890ff" />
      </Container>
    );
  }

  return (
    <Container>
      <GoBackButton />
      <Text style={styles.title} category="h4">
        {meeting!.title}
      </Text>
      <Text category="s1">
        Início: {formatDate(new Date(meeting!.initialDate).toLocaleString())}
      </Text>
      <Text category="s1">
        Fim: {formatDate(new Date(meeting!.finalDate).toLocaleString())}
      </Text>

      <Button
        onPress={handleSendLocation}
        accessoryLeft={
          dataState === states.loadingGeo ? LoadingIcon : undefined
        }
        style={styles.geolocationButton}>
        Enviar minha localização
      </Button>

      <Modal
        visible={dataState === states.geoError || dataState === states.error}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDataState(states.idle)}>
        <Card disabled={true}>
          {dataState === states.error ? (
            <Text style={styles.modalText}>Erro ao enviar localização</Text>
          ) : (
            <Text style={styles.modalText}>Sem permissão de localização</Text>
          )}

          <Button
            size="tiny"
            status="danger"
            style={styles.modalButton}
            onPress={() => setDataState(states.idle)}>
            Fechar
          </Button>
        </Card>
      </Modal>
    </Container>
  );
};

export default MeetingDetail;
