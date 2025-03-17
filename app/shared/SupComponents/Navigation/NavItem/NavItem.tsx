import React, { useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { View } from '@ant-design/react-native';
import { Colours } from '@constants';
import { styles } from './styles';
import { RootStackParamListKeys } from '@/app/context/NavigationContext';
import { Icon } from '@sup-components';

type NavItemProps = {
  isActive: boolean;
  iconLib?: 'Feather' | 'Octicons';
  iconName: string;
  navItemKey: RootStackParamListKeys;
  setIsActive: (path: string) => void;
};

const NavItem: React.FC<NavItemProps> = ({ isActive, iconLib = 'Feather', iconName, navItemKey, setIsActive }) => {
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
          <View style={fcStyles.iconWrapper}>{<Icon iconLib={iconLib} {...iconProps} />}</View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default NavItem;
