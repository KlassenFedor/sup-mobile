import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationIndependentTree } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './context/AuthContext';
import AuthProvider from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyAbsencesScreen from './screens/MyAbsencesScreen';
import CreateAbsenceScreen from './screens/CreateAbsenceScreen';
import AbsenceDetailsScreen from './screens/AbsenceDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import { NavItemType } from '@sup-components';
import Icon from 'react-native-vector-icons/Octicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define tab items based on NavigationBar.tsx
const navItems: NavItemType[] = [
  { navItemKey: 'Home', iconName: 'home' },
  { navItemKey: 'MyAbsences', iconName: 'list-unordered', iconLib: 'Octicons' },
  { navItemKey: 'Profile', iconName: 'person' },
];

// Custom Bottom Tab Bar (FIXED: Added Proper Types)
const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const [activeKey, setActiveKey] = useState(state.routes[state.index].name);

  useEffect(() => {
    setActiveKey(state.routes[state.index].name);
  }, [state]);

  return (
    <View style={styles.navBarWrapper}>
      {navItems.map((navItem, idx) => {
        const isActive = activeKey === navItem.navItemKey;
        return (
          <TouchableOpacity
            key={idx}
            style={styles.tabButton}
            onPress={() => {
              setActiveKey(navItem.navItemKey);
              navigation.navigate(navItem.navItemKey as never);
            }}
          >
            <Icon
              name={navItem.iconName}
              size={24}
              color={isActive ? '#FFA500' : '#808080'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Bottom Tab Navigator
const TabsLayout = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <CustomTabBar {...props} />} // FIXED: Now properly typed
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="MyAbsences" component={MyAbsencesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tabs" component={TabsLayout} />
          <Stack.Screen name="CreateAbsence" component={CreateAbsenceScreen} />
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

// Styles for Custom Navigation Bar
const styles = StyleSheet.create({
  navBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
  },
});
