import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { AuthContext } from '../context/AuthContext';

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
          course: '2' 
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

  const viewMyProfile = async () => {
    navigation.navigate('MyProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Данные пользователя:</Text>
      {userData && (
        <View style={styles.userData}>
          <Text style={styles.userData}>Имя: {userData.name}</Text>
          <Text style={styles.userData}>Email: {userData.email}</Text>
          <Text style={styles.userData}>Группа: {userData.group}</Text>
          <Text style={styles.userData}>Курс: {userData.course}</Text>
        </View>
      )}
      <View style={styles.actionButton}>
        <Button title="Создать пропуск" onPress={createAbsence} />
      </View>
      <View style={styles.actionButton}>
        <Button title="Мои пропуски" onPress={viewMyAbsences} />
      </View>
      <View style={styles.actionButton}>
        <Button title="Профиль" onPress={viewMyProfile} />
      </View>
      <View style={styles.actionButton}>
        <Button title="Выйти" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  userData: {
    marginBottom: 5,
    fontSize: 15,
  },
  actionButton: {
    marginLeft: 100,
    marginRight: 100,
    marginTop: 10,
  }
});

export default HomeScreen;