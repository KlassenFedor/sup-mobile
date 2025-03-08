import React from 'react';
import { View } from '@ant-design/react-native';
import { Colours } from '@constants';
import { StylesType } from '@common/types';
import { handleStylesToAdd } from '@common/helpers';

type ScreenDataWrapperProps = {
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  children: React.ReactNode;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  style?: StylesType;
};

const ScreenDataWrapper: React.FC<ScreenDataWrapperProps> = ({ alignItems, children, justifyContent, style }) => {
  return (
    <View
      style={{
        alignItems: alignItems,
        backgroundColor: Colours.LIGHT_GREY,
        flex: 1,
        flexDirection: 'column',
        justifyContent: justifyContent,
        padding: 16,
        ...handleStylesToAdd(style),
      }}
    >
      {children}
    </View>
  );
};

export default ScreenDataWrapper;
