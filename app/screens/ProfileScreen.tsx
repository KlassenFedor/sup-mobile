import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { AuthContext } from '../context/AuthContext';

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'MyProfile'>;

interface UserProfile {
  name: string;
  email: string;
  groupCode: string;
  courseNumber: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setIsAuthenticated } = useContext(AuthContext);

  const API_URL = 'http://10.0.2.2:8000'; 

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

  const handleLogout = async () => {
    // Remove tokens from AsyncStorage
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    // navigation.navigate('Auth');
  };

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
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.text}>👤 Name: {user.name}</Text>
          <Text style={styles.text}>📧 Email: {user.email}</Text>
          <Text style={styles.text}>🏫 Group Code: {user.groupCode}</Text>
          <Text style={styles.text}>📚 Course: {user.courseNumber}</Text>

          <Button title="Logout" color="red" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.errorText}>Failed to load profile</Text>
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