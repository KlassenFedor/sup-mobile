// import { AppRegistry } from 'react-native';
// import App from './App';
// import appConfig from '../app.json';

// const appName = appConfig.expo.name;
// export default AppRegistry.registerComponent(appName, () => App);

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { AuthContext } from './context/AuthContext';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  MyAbsences: undefined;
  CreateAbsence: undefined;
  MyProfile: undefined;
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
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MyAbsences" component={MyAbsencesScreen} />
                <Stack.Screen name="CreateAbsence" component={CreateAbsenceScreen} />
                <Stack.Screen name="MyProfile" component={ProfileScreen} />
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