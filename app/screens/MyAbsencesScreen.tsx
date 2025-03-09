import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { ScreenDataWrapper, ScreenHeader, CardItem } from '@sup-components';
import { AbsenceDTO } from '../shared/types';

const cardData: AbsenceDTO[] = [
  {
    id: '1',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 2021',
    startDate: '03.03.2025',
    endDate: '07.03.2025',
    status: 'checking',
  },
  {
    id: '2',
    files: [],
    name: 'Пропуск № 956',
    startDate: '01.02.2025',
    endDate: '01.02.2025',
    status: 'rejected',
  },
  {
    id: '3',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 989',
    startDate: '07.02.2025',
    endDate: '09.02.2025',
    status: 'approved',
  },
  {
    id: '4',
    files: [],
    name: 'Пропуск № 1000',
    startDate: '28.02.2025',
    endDate: '28.02.2025',
    status: 'checking',
  },
  {
    id: '5',
    files: [],
    name: 'Пропуск № 1010',
    startDate: '05.03.2025',
    endDate: '06.03.2025',
    status: 'rejected',
  },
  {
    id: '6',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 1810',
    startDate: '13.03.2025',
    endDate: '20.03.2025',
    status: 'checking',
  },
];

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken'); // Retrieve token
    if (token !== null) {
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

// Main screen component
const MyAbsencesScreen: React.FC = () => {
  const [data, setData] = useState<AbsenceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const API_URL = 'http://10.0.2.2:8000'; // Replace with your actual API endpoint

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const response = await axios.get(`${API_URL}/cards`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the token in Authorization header
        },
      });
      setData(response.data); // Ensure API returns an array of cards
    } catch (error) {
      Alert.alert('Error', 'Failed to load absences data.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh function for pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScreenHeader headerTitle="Мои пропуски"></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        {
          loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardItem cardData={item} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
          )
        }
        
      </ScreenDataWrapper>
    </>
  );
};

export default MyAbsencesScreen;