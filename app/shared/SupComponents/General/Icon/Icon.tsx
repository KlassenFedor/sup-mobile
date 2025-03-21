import React from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import { default as IconAD } from 'react-native-vector-icons/AntDesign';
import { default as IconFW5 } from 'react-native-vector-icons/FontAwesome5';
import { default as IconFW6 } from 'react-native-vector-icons/FontAwesome6';
import { default as IconIon } from 'react-native-vector-icons/Ionicons';
import { default as IconMatComm } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as IconMat } from 'react-native-vector-icons/MaterialIcons';
import { default as IconOct } from 'react-native-vector-icons/Octicons';
import { default as IconSimpLine } from 'react-native-vector-icons/SimpleLineIcons';
import { default as IconFeater } from 'react-native-vector-icons/Feather';

type IconFCProps = IconProps & {
  iconLib?:
    | 'AntDesign'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Feather'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons';
};
const Icon: React.FC<IconFCProps> = ({ iconLib = 'AntDesign', size = 20, ...props }) => {
  switch (iconLib) {
    case 'FontAwesome5':
      return <IconFW5 size={size} {...props} />;
    case 'FontAwesome6':
      return <IconFW6 size={size} {...props} />;
    case 'Feather':
      return <IconFeater size={size} {...props} />;
    case 'Ionicons':
      return <IconIon size={size} {...props} />;
    case 'MaterialCommunityIcons':
      return <IconMatComm size={size} {...props} />;
    case 'MaterialIcons':
      return <IconMat size={size} {...props} />;
    case 'Octicons':
      return <IconOct size={size} {...props} />;
    case 'SimpleLineIcons':
      return <IconSimpLine size={size} {...props} />;
    case 'AntDesign':
    default:
      return <IconAD size={size} {...props} />;
  }
};

export default Icon;
