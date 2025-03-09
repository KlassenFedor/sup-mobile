import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './context/AuthContext';
import AuthProvider from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';

import { NavigationBar } from '@sup-components';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  MyAbsences: undefined;
  Profile: undefined;
  CreateAbsence: undefined;
};
export type NavigationProp = StackNavigationProp<RootStackParamList>;
export type NavRoutes = keyof RootStackParamList;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{ tabBarStyle: { display: 'none' } }}
    tabBar={(props) => <NavigationBar {...props} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyAbsences" component={MyAbsencesScreen} />
    <Tab.Screen name="Создать пропуск" component={CreateAbsenceScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Tabs" component={AppTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
