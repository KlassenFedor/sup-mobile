import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../shared/api_requests';

interface UserProfile {
  name: string;
  email: string;
  groupCode: string;
  courseNumber: string;
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await axios.get<UserProfile>(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
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