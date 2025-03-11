import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardItem, ScreenDataWrapper, ScreenHeader } from '@sup-components';
import { AbsenceDTO } from '../shared/types';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface UserData {
  name: string;
  email: string;
  group: string;
  course: string;
}

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbsenceDetails'>;

const cardData: AbsenceDTO[] = [
  {
    id: '2021',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 2021',
    startDate: '03.03.2025',
    endDate: '07.03.2025',
    status: 'checking',
  },
  {
    id: '1000',
    files: [],
    name: 'Пропуск № 1000',
    startDate: '28.02.2025',
    endDate: '28.02.2025',
    status: 'checking',
  },
  {
    id: '1810',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 1810',
    startDate: '13.03.2025',
    endDate: '20.03.2025',
    status: 'checking',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  // const [userData, setUserData] = useState<UserData | null>(null);
  // const { setIsAuthenticated } = useAuth();

  // // Simulate fetching user data using the access token
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const accessToken = await AsyncStorage.getItem('accessToken');
  //     if (accessToken) {
  //       // Simulate an API call to fetch user data
  //       setUserData({
  //         name: 'Ivan Ivanov',
  //         email: 'ivan.ivanov@example.com',
  //         group: '111111',
  //         course: '2',
  //       });
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // const handleLogout = async () => {
  //   // Remove tokens from AsyncStorage
  //   await AsyncStorage.removeItem('accessToken');
  //   await AsyncStorage.removeItem('refreshToken');
  //   setIsAuthenticated(false);
  //   // navigation.navigate('Auth');
  // };

  // const createAbsence = async () => {
  //   navigation.navigate('CreateAbsence');
  // };

  // const viewMyAbsences = async () => {
  //   navigation.navigate('MyAbsences');
  // };

  return (
    <>
      <ScreenHeader headerTitle="Пропуски на проверке"></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <FlatList
          data={cardData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('AbsenceDetails', { absenceId: item.id })}>
              <CardItem cardData={item} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScreenDataWrapper>
    </>
  );
};

export default HomeScreen;
