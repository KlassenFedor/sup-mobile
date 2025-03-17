import React, { ReactElement } from 'react';
import { Form, FormItemProps } from '@ant-design/react-native';
import { Colours } from '../../../constants';

type FormItemType<T> = FormItemProps<T> & {
  children: React.ReactNode;
};

const FormItem: <T = never>(props: FormItemType<T>) => ReactElement = ({ children, ...props }) => {
  return (
    <Form.Item
      styles={{
        Line: { borderColor: 'transparent', paddingInline: 0 },
        Item: { paddingInline: 0 },
        Content: { paddingInline: 0 },
        asterisk: { color: Colours.PRIMARY, left: 0, top: 0 },
        formItemLabelText: { fontSize: 14, marginLeft: 12 },
        formItemLabel: { marginBottom: 2, paddingTop: 0, alignItems: 'center' },
      }}
      {...props}
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
