import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../index';
import { Button, ContentBlock, ScreenDataWrapper, TextInput } from '@sup-components';
import { Colours } from '@constants';

type AuthScreenProps = StackScreenProps<RootStackParamList, 'Auth'> & {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ setIsAuthenticated }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    // Simulate a login API call
    if (login === 'user' && password === 'password') {
      // Simulate receiving tokens from the server
      const accessToken = 'dummyAccessToken';
      const refreshToken = 'dummyRefreshToken';

      // Save tokens to AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      // Update authentication state
      setIsAuthenticated(true);
    } else {
      Alert.alert('Error', 'Invalid login or password');
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

export default AuthScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    marginBottom: 16,
    color: Colours.PRIMARY,
    textAlign: 'center',
  },
});
