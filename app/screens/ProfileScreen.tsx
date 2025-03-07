import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface UserProfile {
  name: string;
  email: string;
  groupCode: string;
  courseNumber: string;
}

type RootStackParamList = {
    Auth: undefined;  // Auth screen
    Tabs: undefined;  // Bottom tab navigation
  };

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tabs'>;

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();

  const API_URL = 'http://10.0.2.2:8000'; 
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Auth');  // Replace Tabs with Auth screen
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('refreshToken');
        const refreshTokenResponse = await axios.post(`${API_URL}/refresh`, { "token": token });
        await AsyncStorage.setItem('accessToken', refreshTokenResponse.data["access_token"]);
        const newToken = await AsyncStorage.getItem('accessToken');

        const response = await axios.get<UserProfile>(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });

        setUser(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch profile');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Профиль</Text>
          <Text style={styles.text}>👤 Имя: {user.name}</Text>
          <Text style={styles.text}>📧 Email: {user.email}</Text>
          <Text style={styles.text}>🏫 Группа: {user.groupCode}</Text>
          <Text style={styles.text}>📚 Курс: {user.courseNumber}</Text>

          <Button title="Выйти" color="red" onPress={logout} />
        </>
      ) : (
        <>
        <Text style={styles.errorText}>Не удалось загрузить профиль</Text>
          <Button title="Выйти" color="red" onPress={logout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;