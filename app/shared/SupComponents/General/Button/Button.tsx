import React, { useState } from 'react';
import { Button as AntButton, ButtonProps } from '@ant-design/react-native';
import { styles } from './styles';
import { StylesType } from '@common/types';
import { handleStylesToAdd } from '@common/helpers';

type SupButtonProps = ButtonProps & {
  children: React.ReactNode;
  styleType?: 'primary' | 'warning' | 'ghost' | 'blank';
  style?: StylesType;
};

const Button: React.FC<SupButtonProps> = ({ children, styleType, style, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);

  const commonBtnStyles = styles.all.common;
  const typeBasedStyles = styles.type[styleType ? styleType : props.type || 'primary'];
  const stylesToAdd = handleStylesToAdd(style);

  return (
    <AntButton
      style={[stylesToAdd, commonBtnStyles, typeBasedStyles.common, isPressed && typeBasedStyles.onPressed]}
      activeStyle={typeBasedStyles.onPressed}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
