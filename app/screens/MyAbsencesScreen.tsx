import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ActivityIndicator, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { ScreenDataWrapper, ScreenHeader, CardItem, Button, Icon } from '@sup-components';
import { AbsenceDTO } from '../shared/types';
import { Colours } from '../shared/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../shared/api_requests';

type RootStackParamList = {
  CreateAbsence: undefined;
  AbsenceDetails: { absenceId: string };
};

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token ?? null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

const MyAbsencesScreen: React.FC = () => {
  const [data, setData] = useState<AbsenceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
          <ActivityIndicator size="large" color={Colours.PRIMARY} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('AbsenceDetails', { absenceId: item.id })}>
                <CardItem cardData={item} />
              </TouchableOpacity>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Floating Action Button */}
        <Button
          type="primary"
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
            width: 56,
            height: 56,
            borderRadius: 28, // Corrected
            backgroundColor: Colours.PRIMARY,
            elevation: 4, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('CreateAbsence')}
        >
          <Icon iconLib="Feather" name="plus" size={24} color={Colours.WHITE} />
        </Button>
      </ScreenDataWrapper>
    </>
  );
};

export default MyAbsencesScreen;
