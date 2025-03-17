import React from 'react';
import { View } from '@ant-design/react-native';
import { styles } from './styles';
import { ViewStyle } from 'react-native';

type FormBlockViewProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

const FormBlockView: React.FC<FormBlockViewProps> = ({ children, style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
      <View style={styles.line} />
    </View>
  );
};

export default FormBlockView;
