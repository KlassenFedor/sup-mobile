import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavItemType, NavItem } from '@sup-components';
import { styles } from './styles';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const navItems: NavItemType[] = [
  { navItemKey: 'Home', iconName: 'home' },
  { navItemKey: 'MyAbsences', iconName: 'list-unordered', iconLib: 'Octicons' },
  { navItemKey: 'Profile', iconName: 'user' },
];

const NavigationBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const [activeKey, setActiveKey] = useState(state.routes[state.index].name);
  useEffect(() => {
    setActiveKey(state.routes[state.index].name);
  }, [state]);

  const handleNavigation = (path: string) => {
    setActiveKey(path);
    navigation.navigate(path);
  };

  return (
    <View style={styles.navBarWrapper}>
      {navItems.map((navItem, idx) => {
        const isActive = activeKey === navItem.navItemKey;
        return (
          <NavItem
            key={idx}
            isActive={isActive}
            iconLib={navItem.iconLib}
            iconName={navItem.iconName}
            navItemKey={navItem.navItemKey}
            setIsActive={handleNavigation}
          />
        );
      })}
    </View>
  );
};

export default NavigationBar;
