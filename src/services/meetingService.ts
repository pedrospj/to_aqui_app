import axios from './axiosInstance';
import { Meeting } from '../interfaces/Meeting';

export const getUserMeetings = async (userId: string): Promise<Meeting[]> => {
  const response = await axios.get(`/meeting/user/${userId}`);
  return response.data.meetings;
};
