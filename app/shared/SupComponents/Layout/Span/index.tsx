import React from 'react';
import { View } from '@ant-design/react-native';
import { StylesType } from '@common/types';
import { handleStylesToAdd } from '@common/helpers';

type SpanProps = {
  children: React.ReactNode;
  style?: StylesType;
};

const Span: React.FC<SpanProps> = ({ children, style }) => (
  <View
    style={{
      display: 'inline',
      marginHorizontal: 0,
      ...handleStylesToAdd(style),
    }}
  >
    {children}
  </View>
);

export default Span;
