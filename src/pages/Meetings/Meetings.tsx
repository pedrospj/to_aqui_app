import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { Text, ActivityIndicator, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Button } from '@ui-kitten/components';
import { getUserMeetings } from '../../services/meetingService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../store/user/types';
import { Meeting } from '../../interfaces/Meeting';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import MeetingItem from '../../components/MeetingItem/MeetingItem';

const states = {
  idle: 'IDLE',
  loading: 'LOADING',
  error: 'ERROR',
};

const Meetings = () => {
  const [dataState, setDataState] = useState(states.loading);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { uid } = useSelector<RootState, UserState>((state) => state.user);

  useEffect(() => {
    const fetchMeetings = async () => {
      setDataState(states.loading);
      const response = await getUserMeetings(uid);
      setMeetings(response);
      setDataState(states.idle);
    };
    fetchMeetings();
  }, [uid]);

  if (dataState === states.loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#1890ff" />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.id}
        data={meetings}
        renderItem={({ item }) => <MeetingItem {...item} />}
      />
    </Container>
  );
};

export default Meetings;
