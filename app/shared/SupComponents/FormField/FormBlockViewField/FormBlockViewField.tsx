import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '@ant-design/react-native';
import { Colours } from '@constants';
import { Icon } from '@sup-components';

type FormBlockViewFieldProps = {
  title: string;
  value?: string;
  iconName?: string;
  iconLib?:
    | 'AntDesign'
    | 'FontAwesome5'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons';
};

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBlock: 4,
    paddingInline: 4,
    marginBottom: 4,
  },
  title: {
    color: Colours.BLACK,
    fontSize: 14,
    marginRight: 12,
  },
  value: {
    color: '#656565',
    fontSize: 14,
  },
});

const FormBlockViewField: React.FC<FormBlockViewFieldProps> = ({ title, value = '', iconName, iconLib = 'AntDesign' }) => {
  return (
    <View style={styles.textRow}>
      {iconName && <Icon name={iconName} iconLib={iconLib} color={Colours.PRIMARY} style={{ marginRight: 4 }} />}
      <Text style={styles.title}>{title}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
  );
};

export default FormBlockViewField;
