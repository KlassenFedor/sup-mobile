import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import axios, { AxiosError } from 'axios';

type AuthScreenProps = StackScreenProps<RootStackParamList, 'Auth'> & {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const API_URL = 'http://10.0.2.2:8000'; // Replace with your actual API endpoint

const AuthScreen: React.FC<AuthScreenProps> = ({ setIsAuthenticated }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { "username": login, "password": password });
      const accessToken = response.data['access_token'];
      const refreshToken = response.data['refresh_token'];

      // Store tokens
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      // Update authentication state
      setIsAuthenticated(true);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authorization</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update tokens in storage
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    Alert.alert('Session Expired', 'Please log in again');
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AuthScreen;