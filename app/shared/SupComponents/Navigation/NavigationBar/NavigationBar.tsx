import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavItemType, NavItem } from '@sup-components';
import { styles } from './styles';
import { NavigationContext } from '../../../../index';

const navItems: NavItemType[] = [
  { navItemKey: 'Home', iconName: 'home' },
  { navItemKey: 'MyAbsences', iconName: 'list-unordered', iconLib: 'Octicons' },
  { navItemKey: 'Profile', iconName: 'user' },
];

const NavigationBar: React.FC = () => {
  const context = useContext(NavigationContext);

  if (!context) return null;

  const { navigation, state } = context;
  const [activeKey, setActiveKey] = useState<string>('Home');

  useEffect(() => {
    if (state && state.routes) {
      const activeRouteName = state.routes[state.index].name;
      setActiveKey(activeRouteName);
    }
  }, [state]);

  const handleNavigation = (path: string) => {
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
