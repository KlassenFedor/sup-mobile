import React, { useMemo, useState } from 'react';
import { Input, View } from '@ant-design/react-native';
import { Span } from '@sup-components';
import { Rule, TextInputProps } from './types';
import { inputRequired, styles } from './styles';

const isRequired = (rules?: Rule[]): 'true' | 'false' => {
  return rules?.some((rule) => (Object.prototype.hasOwnProperty.call(rule, 'required') ? !!rule?.required === true : false))
    ? 'true'
    : 'false';
};

const TextInput: React.FC<TextInputProps> = ({ label, rules, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = useMemo(() => [styles.input, isFocused && styles.inputFocused], [isFocused]);

  return (
    <View style={styles.container}>
      <Span style={styles.labelBlock}>
        <View style={inputRequired[isRequired(rules)]}>*</View>
        <View>{label}</View>
      </Span>
      <Input
        type="text"
        defaultValue={undefined}
        inputStyle={inputStyle}
        style={styles.inputWrapper}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default TextInput;
