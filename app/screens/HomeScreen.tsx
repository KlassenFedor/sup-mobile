import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { ScreenDataWrapper, ScreenHeader } from '@sup-components';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface UserData {
  name: string;
  email: string;
  group: string;
  course: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  // Simulate fetching user data using the access token
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        // Simulate an API call to fetch user data
        setUserData({
          name: 'Ivan Ivanov',
          email: 'ivan.ivanov@example.com',
          group: '111111',
          course: '2',
        });
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    // Remove tokens from AsyncStorage
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    // navigation.navigate('Auth');
  };

  const createAbsence = async () => {
    navigation.navigate('CreateAbsence');
  };

  const viewMyAbsences = async () => {
    navigation.navigate('MyAbsences');
  };

  return (
    <>
      <ScreenHeader headerTitle="Пропуски на проверке"></ScreenHeader>
      <ScreenDataWrapper>
        <></>
      </ScreenDataWrapper>
    </>
  );
};

export default HomeScreen;
