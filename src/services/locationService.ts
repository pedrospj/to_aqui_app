import axios from './axiosInstance';

export const sendGeolocation = async (data: {
  meetingId: string;
  lat: number;
  long: number;
  userId: string;
}) => {
  await axios.put(`/geolocation/${data.meetingId}`, {
    latitude: data.lat,
    longitude: data.long,
    userId: data.userId,
  });
};
