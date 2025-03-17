import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ContentBlock, ScreenDataWrapper, Span, TextInput } from '@sup-components';
import { Colours } from '@constants';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../shared/api_requests';


const AuthScreen: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username: login, password: password });
      const accessToken = response.data['token'];
      await AsyncStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.log(error);
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
          <Text style={{ fontSize: 16 }}>ВОЙТИ</Text>
        </Button>
      </ContentBlock>
    </ScreenDataWrapper>
  );
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
