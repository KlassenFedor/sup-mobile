import React, { useMemo } from 'react';
import { Image } from 'react-native';
import { View } from '@ant-design/react-native';
import { styles } from './styles';
import { StylesType } from '@/app/shared/types';
import { handleStylesToAdd } from '@/app/shared/helpers';

type AvatarProps = {
  uri?: string;
  size?: number;
  style?: StylesType;
};

const Avatar: React.FC<AvatarProps> = ({ uri, size = 64, style = {} }) => {
  const fcStyles = useMemo(() => {
    return {
      avatarCircle: {
        ...styles.avatarCircle,
        height: size,
        width: size,
        ...handleStylesToAdd(style),
      },
      imageStyle: {
        ...styles.imageStyle,
        height: size - 8,
        width: size - 8,
      },
    };
  }, [size]);

  return (
    <View style={fcStyles.avatarCircle}>
      <Image
        style={fcStyles.imageStyle}
        source={uri ? { uri } : require('../../../../../assets/images/blankAvatar.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default Avatar;
