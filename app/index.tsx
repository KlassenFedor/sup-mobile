import React, { createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationBar } from '@sup-components';

import AuthProvider, { useAuth } from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import AbsenceDetailsScreen from './screens/AbsenceDetailsScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define navigation types
export type RootStackParamList = {
  Auth: undefined;
  TabsLayout: undefined;
  MyAbsences: undefined;
  Profile: undefined;
  CreateAbsence: undefined;
  AbsenceDetails: undefined;
};

export interface NavigationContextType {
  state: any;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Bottom Tab Navigation
const AppTabs = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyAbsences" component={MyAbsencesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Layout for Bottom Tabs with a navigation bar
const TabsLayout: React.FC<any> = ({ navigation }) => {
  const state = useNavigationState((state) => state);
  return (
    <NavigationContext.Provider value={{ state }}>
      <AppTabs />
      <NavigationBar />
    </NavigationContext.Provider>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'TabsLayout' : 'Auth'} screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="TabsLayout" component={TabsLayout} />
          <Stack.Screen name="CreateAbsence" component={CreateAbsenceScreen} />
          <Stack.Screen name="AbsenceDetails" component={AbsenceDetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

// Root Component (Fixed: Removed NavigationContainer)
export default function App() {
  return (
    <NavigationIndependentTree>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationIndependentTree>
  );
}
