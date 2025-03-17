import React, { useState } from 'react';
import { Button as AntButton, ButtonProps, Text, View } from '@ant-design/react-native';
import { styles } from './styles';
import { StylesType } from '@common/types';
import { handleStylesToAdd } from '@common/helpers';

type SupButtonProps = ButtonProps & {
  children: React.ReactNode;
  styleType?: 'primary' | 'warning' | 'ghost' | 'blank';
  style?: StylesType;
  wrap?: boolean;
  wrappedRowStyle?: StylesType;
};

const Button: React.FC<SupButtonProps> = ({ children, styleType, wrappedRowStyle, style, wrap = false, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);

  const commonBtnStyles = styles.all.common;
  const typeBasedStyles = styles.type[styleType ? styleType : props.type || 'primary'];
  const stylesToAdd = handleStylesToAdd(style);

  const ButtonToRender = () => (
    <AntButton
      style={[commonBtnStyles, typeBasedStyles.common, isPressed && typeBasedStyles.onPressed, stylesToAdd]}
      activeStyle={typeBasedStyles.onPressed}
      // onPressIn={() => setIsPressed(true)}
      // onPressOut={() => setIsPressed(false)}
      {...props}
    >
      <Text style={typeBasedStyles.cardText}>{children}</Text>
    </AntButton>
  );

  return wrap ? (
    <View style={[wrappedRowStyle, styles.all.wrapper]}>
      <ButtonToRender />
    </View>
  ) : (
    <ButtonToRender />
  );
};

export default Button;
