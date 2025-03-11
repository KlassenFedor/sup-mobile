import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ActivityIndicator, Alert, RefreshControl, TouchableOpacity, StyleSheet, View } from 'react-native';
import { ScreenDataWrapper, ScreenHeader, CardItem } from '@sup-components';
import { AbsenceDTO } from '../shared/types';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the "+" icon
import { StackNavigationProp } from '@react-navigation/stack';

// const cardData: AbsenceDTO[] = [
//   {
//     id: '1',
//     files: ['file1.pdf', 'file2.pdf'],
//     name: 'Пропуск № 2021',
//     startDate: '03.03.2025',
//     endDate: '07.03.2025',
//     status: 'checking',
//   },
//   {
//     id: '2',
//     files: [],
//     name: 'Пропуск № 956',
//     startDate: '01.02.2025',
//     endDate: '01.02.2025',
//     status: 'rejected',
//   },
//   {
//     id: '3',
//     files: ['file1.pdf', 'file2.pdf'],
//     name: 'Пропуск № 989',
//     startDate: '07.02.2025',
//     endDate: '09.02.2025',
//     status: 'approved',
//   },
//   {
//     id: '4',
//     files: [],
//     name: 'Пропуск № 1000',
//     startDate: '28.02.2025',
//     endDate: '28.02.2025',
//     status: 'checking',
//   },
//   {
//     id: '5',
//     files: [],
//     name: 'Пропуск № 1010',
//     startDate: '05.03.2025',
//     endDate: '06.03.2025',
//     status: 'rejected',
//   },
//   {
//     id: '6',
//     files: ['file1.pdf', 'file2.pdf'],
//     name: 'Пропуск № 1810',
//     startDate: '13.03.2025',
//     endDate: '20.03.2025',
//     status: 'checking',
//   },
// ];

type RootStackParamList = {
  CreateAbsence: undefined;
};
type MyAbsencesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateAbsence'>;

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token !== null ? token : null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

const MyAbsencesScreen: React.FC = () => {
  const [data, setData] = useState<AbsenceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<MyAbsencesScreenNavigationProp>(); // Hook for navigation

  const API_URL = 'http://10.0.2.2:8000';

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const response = await axios.get(`${API_URL}/cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load absences data.');
    } finally {
      setLoading(false);
    }
  };

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
      <ScreenHeader headerTitle="Мои пропуски" />
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardItem cardData={item} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </ScreenDataWrapper>

      {/* Floating Orange Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateAbsence')} // Navigate to CreateAbsence screen
      >
        <Ionicons name="add" size={60} color="white" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#DE4E2B', // Orange color
    width: 60,
    height: 60,
    borderRadius: 30, // Makes it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MyAbsencesScreen;
