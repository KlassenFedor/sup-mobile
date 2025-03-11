import React from 'react';
import { View, Text } from '@ant-design/react-native';
import { styles } from './styles';
import { StylesType } from '../../../types/index';
import { handleStylesToAdd } from '../../../helpers/index';

type FormFieldsBlockTitleProps = {
  title: string;
  style?: StylesType;
};

const FormFieldsBlockTitle: React.FC<FormFieldsBlockTitleProps> = ({ title, style }) => {
  return (
    <View style={[styles.container, { ...handleStylesToAdd(style) }]}>
      <View style={styles.column}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default FormFieldsBlockTitle;
