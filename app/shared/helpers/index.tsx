import moment from 'moment';
import { ServerDateFormat } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
