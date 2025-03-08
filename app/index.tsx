import React, { useState, useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import { AuthContext } from './context/AuthContext';
import { NavigationBar } from '@sup-components';
import { NavigationIndependentTree } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  MyAbsences: undefined;
  Profile: undefined;
  CreateAbsence: undefined;
};
export type NavigationProp = StackNavigationProp<RootStackParamList>;
export type NavRoutes = keyof RootStackParamList;

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
    <NavigationIndependentTree>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
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
        {isAuthenticated && <NavigationBar />}
      </AuthContext.Provider>
    </NavigationIndependentTree>
  );
}
