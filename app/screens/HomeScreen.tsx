import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { AuthContext } from '../context/AuthContext';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

interface UserData {
  name: string;
  email: string;
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
        setUserData({ name: 'Ivan Ivanov', email: 'ivan.ivanov@example.com' });
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
    <View style={styles.container}>
      <Text style={styles.userData}>Данные пользователя:</Text>
      {userData && (
        <View style={styles.userData}>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
        </View>
      )}
      <Button title="Создать пропуск" onPress={createAbsence} />
      <Button title="Мои пропуски" onPress={viewMyAbsences} />
      <Button title="Выйти" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  userData: {
    marginBottom: 16,
  },
  actionButton: {
    gap: 5
  }
});

export default HomeScreen;