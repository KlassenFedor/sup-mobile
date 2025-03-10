import React, { createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationStateType, NavigationType } from './context/NavigationContext';
import { useAuth } from './context/AuthContext';
import AuthProvider from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import AbsenceDetailsScreen from './screens/AbsenceDetailsScreen';

import { NavigationBar } from '@sup-components';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  MyAbsences: undefined;
  Profile: undefined;
  CreateAbsence: undefined;
};

export interface NavigationContextType {
  navigation: NavigationType;
  state: NavigationStateType;
}

export type NavRoutes = keyof RootStackParamList;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const NavigationContext = createContext<NavigationContextType>({});

const AppTabs = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={{ tabBarStyle: { display: 'none' }, headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyAbsences" component={MyAbsencesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const TabsLayout: React.FC = ({ navigation }) => {
  const state = useNavigationState((state) => state);
  return (
    <NavigationContext.Provider value={{ navigation, state }}>
      <AppTabs />
      <NavigationBar />
    </NavigationContext.Provider>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'TabsLayout' : 'Auth'} screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="TabsLayout" component={TabsLayout} />
          <Stack.Screen name="AddAbsenceScreen" component={CreateAbsenceScreen} />
          <Stack.Screen name="AbsenceDetails" component={AbsenceDetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationIndependentTree>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationIndependentTree>
  );
}
