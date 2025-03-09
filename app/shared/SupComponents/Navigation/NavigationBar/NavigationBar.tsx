import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from '@ant-design/react-native';
import { NavItemType, NavItem } from '@sup-components';
import { styles } from './styles';
import { NavigationProp, NavRoutes } from '@/app';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const navItems: NavItemType[] = [
  { navItemKey: 'Home', iconName: 'home' },
  { navItemKey: 'MyAbsences', iconName: 'list-unordered', iconLib: 'Octicons' },
  { navItemKey: 'Profile', iconName: 'user' },
];

const NavigationBar: React.FC<BottomTabBarProps> = ({ navigation, state }) => {
  const [activeKey, setActiveKey] = useState<string>(state.routes[state.index].name);
  console.log('Active Key:', activeKey);

  const handleNavigation = async (path: string) => {
    setActiveKey(path);
    navigation.navigate(path);
  };

  return (
    <View style={styles.navBarWrapper}>
      {navItems.map((navItem, idx) => (
        <NavItem
          key={idx}
          activeKey={activeKey}
          iconLib={navItem.iconLib}
          iconName={navItem.iconName}
          navItemKey={navItem.navItemKey}
          setIsActive={handleNavigation}
        />
      ))}
    </View>
  );
};

export default NavigationBar;
