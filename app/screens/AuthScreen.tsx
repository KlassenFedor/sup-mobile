import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ContentBlock, ScreenDataWrapper, TextInput } from '@sup-components';
import { Colours } from '@constants';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://10.0.2.2:8000'; // Replace with your actual API endpoint

const AuthScreen: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { "username": login, "password": password });
      const accessToken = response.data['access_token'];
      const refreshToken = response.data['refresh_token'];

      // Store tokens
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      setIsAuthenticated(true);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.log(error)
    }
  };

  return (
    <ScreenDataWrapper style={{ backgroundColor: Colours.WHITE }}>
      <ContentBlock alignItems="center" style={{ marginBottom: 32, marginTop: 150 }}>
        <Text style={styles.title}>Авторизация</Text>
      </ContentBlock>
      <ContentBlock>
        <TextInput
          label="Логин"
          rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
          placeholder="Введите логин"
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          label="Пароль"
          rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
          placeholder="Введите пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button type="primary" style={{ width: '100%', marginTop: 20 }} onPress={handleLogin}>
          <span style={{ fontSize: 16 }}>ВОЙТИ</span>
        </Button>
      </ContentBlock>
    </ScreenDataWrapper>
  );
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${API_URL}/refresh`, { 'token': refreshToken });
    const accessToken = response.data['access_token'];
    const newRefreshToken = response.data['refresh_token'];

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
  title: {
    fontSize: 34,
    marginBottom: 16,
    color: Colours.PRIMARY,
    textAlign: 'center',
  },
});

export default AuthScreen;