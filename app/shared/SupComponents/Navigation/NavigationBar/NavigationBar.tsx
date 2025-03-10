import React, { useContext, useEffect, useState } from 'react';
import { View } from '@ant-design/react-native';
import { NavItemType, NavItem } from '@sup-components';
import { styles } from './styles';
import { RootStackParamListKeys } from '../../../../context/NavigationContext';
import { NavigationContext } from '../../../../index';

const navItems: NavItemType[] = [
  { navItemKey: 'Home', iconName: 'home' },
  { navItemKey: 'MyAbsences', iconName: 'list-unordered', iconLib: 'Octicons' },
  { navItemKey: 'Profile', iconName: 'user' },
];

const NavigationBar: React.FC = () => {
  const context = useContext(NavigationContext);
  console.log('context', context);
  if (!context || (context && Object.keys(context).length === 0)) return null;

  const { navigation, state } = context;
  const [stateCtx, setStateCtx] = useState(state);

  useEffect(() => {
    setStateCtx(state);
  }, [state]);

  console.log('stateCtx', stateCtx);
  const tabsActiveIndex = stateCtx.index;
  const tabsLayoutState = stateCtx.routes[tabsActiveIndex];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.log('tabsLayoutState', tabsLayoutState);
  const [activeKey, setActiveKey] = useState<RootStackParamListKeys>('Home');
  // const [activeKey, setActiveKey] = useState<RootStackParamListKeys>(tabsLayoutState.routes[tabsLayoutState.index].name);
  console.log('Active Key:', activeKey);

  const handleNavigation = async <T extends RootStackParamListKeys>(path: T) => {
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
