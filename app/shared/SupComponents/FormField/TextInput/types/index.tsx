import { InputProps } from '@ant-design/react-native';

type RuleName = { minLength?: number } | { maxLength?: number };

export type Rule = RuleName & { required?: boolean; message?: string };

export type TextInputProps = InputProps & {
  label?: string;
  rules?: Rule[];
};
