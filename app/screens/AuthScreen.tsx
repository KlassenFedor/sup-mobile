import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

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