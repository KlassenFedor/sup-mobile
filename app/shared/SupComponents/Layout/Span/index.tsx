import React from 'react';
import { View } from '@ant-design/react-native';
import { StylesType } from '@common/types';
import { handleStylesToAdd } from '@common/helpers';

type SpanProps = {
  children: React.ReactNode;
  styles?: StylesType;
};

const Span: React.FC<SpanProps> = ({ children, styles }) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 0,
      ...handleStylesToAdd(styles),
    }}
  >
    {children}
  </View>
);

export default Span;
