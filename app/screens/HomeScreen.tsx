import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardItem, ScreenDataWrapper, ScreenHeader } from '@sup-components';
import { AbsenceDTO } from '../shared/types';
import { Alert, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken, isAuthorized } from '../shared/helpers';
import axios from 'axios';
import { API_URL, requests } from '../shared/api_requests';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbsenceDetails'>;

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<AbsenceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { logout } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      if (await isAuthorized() === false) {
        logout();
      }
      const token = await getAccessToken();
      const response = await axios.get(`${API_URL}/${requests.ABSENCES_ON_CHECKING}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные.');
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
      <ScreenHeader headerTitle="Пропуски на проверке"></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
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
      </ScreenDataWrapper>
    </>
  );
};

export default HomeScreen;
