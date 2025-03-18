import moment from 'moment';
import { ServerDateFormat } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UserProfileDTO } from '../types';
import { API_URL, requests } from '../api_requests';

export const handleStylesToAdd = (styles?: any) => (typeof styles === 'object' ? styles : {});

export const convertStrToDate = (date: string) => moment(date, ServerDateFormat).toDate();

export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token ?? null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

export const isAuthorized = async (): Promise<boolean> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return false;

    await axios.get<UserProfileDTO>(`${API_URL}/${requests.PROFILE}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return true;
  } catch (error: any) {
    console.error('Error checking authorization:', error);
    return false;
  }
};