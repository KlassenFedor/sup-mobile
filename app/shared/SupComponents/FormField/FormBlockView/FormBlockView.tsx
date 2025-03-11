import React from 'react';
import { View } from '@ant-design/react-native';
import { styles } from './styles';

type FormBlockViewProps = {
  children?: React.ReactNode;
};

const FormBlockView: React.FC<FormBlockViewProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.line} />
    </View>
  );
};

export default FormBlockView;
