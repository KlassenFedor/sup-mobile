import React, { createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationIndependentTree } from '@react-navigation/native';
import AuthProvider, { useAuth } from './context/AuthContext';
import { NavigationBar } from '@sup-components';

import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import AbsenceDetailsScreen from './screens/AbsenceDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import EditAbsenceScreen from './screens/EditAbsenceScreen';
import { Provider } from '@ant-design/react-native';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  TabsLayout: undefined;
  MyAbsences: undefined;
  Profile: undefined;
  CreateAbsence: undefined;
  EditAbsence: undefined;
  AbsenceDetails: undefined;
};

export interface NavigationContextType {
  navigation: NavigationType;
  state: any;
}

export type NavRoutes = keyof RootStackParamList;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const TabsLayout = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} tabBar={(props) => <NavigationBar {...props} />}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyAbsences" component={MyAbsencesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tabs" component={TabsLayout} />
          <Stack.Screen name="CreateAbsence" component={CreateAbsenceScreen} />
          <Stack.Screen name="EditAbsence" component={EditAbsenceScreen} />
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
    <Provider>
      <NavigationIndependentTree>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationIndependentTree>
    </Provider>
  );
}
