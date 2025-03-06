import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import { AuthContext } from './context/AuthContext';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  MyAbsences: undefined;
  CreateAbsence: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the user is already authenticated (e.g., on app launch)
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Stack.Navigator>
        {isAuthenticated ? (
          // Authenticated screens
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="MyAbsences" component={MyAbsencesScreen} />
            <Stack.Screen name="CreateAbsence" component={CreateAbsenceScreen} />
          </>
        ) : (
          // Auth screen
          <Stack.Screen name="Auth" options={{ headerShown: false }}>
            {(props) => <AuthScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
