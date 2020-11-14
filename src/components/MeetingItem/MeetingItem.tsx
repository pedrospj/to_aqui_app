import React from 'react';
import { View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface MeetingItemProps {
  title: string;
  initialDate: string;
  finalDate: string;
  id: string;
}

const formatDate = (dateStr: string) => {
  const [date, timeStr] = dateStr.split(' ');
  const time = timeStr.split(':');
  return `${date} às ${time[0]}:${time[1]}`;
};

const MeetingItem = ({
  title,
  initialDate,
  finalDate,
  id,
}: MeetingItemProps) => {
  const navigation = useNavigation();
  return (
    <Card
      style={styles.container}
      onPress={() =>
        navigation.navigate('MeetingDetail', {
          params: { meetingId: id },
        })
      }
      status="primary"
      header={() => (
        <Text category="h5" style={styles.title}>
          {title}
        </Text>
      )}>
      <Text>Início: {formatDate(new Date(initialDate).toLocaleString())}</Text>
      <Text>Fim: {formatDate(new Date(finalDate).toLocaleString())}</Text>
    </Card>
  );
};

export default MeetingItem;
