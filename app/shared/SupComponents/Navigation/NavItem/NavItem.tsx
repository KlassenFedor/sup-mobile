import React, { useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { View } from '@ant-design/react-native';
import { NavRoutes } from '@/app';
import { Colours } from '@constants';
import { default as FIcon } from 'react-native-vector-icons/Feather';
import { default as OctIcon } from 'react-native-vector-icons/Octicons';
import { styles } from './styles';

type NavItemProps = {
  activeKey: string;
  iconLib?: 'Feather' | 'Octicons';
  iconName: string;
  navItemKey: NavRoutes;
  setIsActive: (path: NavRoutes) => void;
};

const NavItem: React.FC<NavItemProps> = ({ activeKey, iconLib = 'Feather', iconName, navItemKey, setIsActive }) => {
  const isActive = activeKey === navItemKey;

  const fcStyles = useMemo(() => {
    return {
      container: styles.navItemContainer,
      iconWrapper: styles.iconWrapper,
      iconArea: [styles.iconArea, isActive && styles.iconAreaActive],
    };
  }, [isActive]);

  const iconProps = useMemo(() => {
    return { size: 20, name: iconName, color: isActive ? Colours.PRIMARY_DARK : Colours.ICON_COLOR };
  }, [iconLib, isActive]);

  return (
    <TouchableHighlight activeOpacity={1} underlayColor={'transparent'} onPress={() => setIsActive(navItemKey)}>
      <View style={fcStyles.container}>
        <View style={fcStyles.iconArea}>
          <View style={fcStyles.iconWrapper}>
            {iconLib === 'Feather' && <FIcon {...iconProps} />}
            {iconLib === 'Octicons' && <OctIcon {...iconProps} />}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default NavItem;
