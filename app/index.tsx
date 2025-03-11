import React, { createContext, useEffect, useState } from 'react';
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

// Root Component
export default function App() {
  return (
    <NavigationIndependentTree>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationIndependentTree>
  );
}

// // Styles for Custom Navigation Bar
// const styles = StyleSheet.create({
//   navBarWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     height: 60,
//     borderTopWidth: 1,
//     borderTopColor: '#dddddd',
//   },
//   tabButton: {
//     padding: 10,
//     alignItems: 'center',
//   },
// });
