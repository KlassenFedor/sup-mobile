import React, { useMemo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import moment from 'moment';
import { DatePicker, DatePickerProps, Form } from '@ant-design/react-native';
import { Colours, MonthNames } from '../../../constants';
import { styles } from './styles';
import { convertStrToDate } from '../../../helpers/index';
import { Icon } from '@sup-components';

const labelRenderer = (type: string, data: number) => {
  switch (type) {
    case 'month':
      return MonthNames[data - 1];
    case 'year':
    case 'day':
    case 'hour':
    case 'minute':
    case 'second':
    default:
      return data;
  }
};

const dateTimePickerLocale = {
  okText: 'выбрать',
  dismissText: 'закрыть',
  DatePickerLocale: {
    year: 'год',
    month: 'мес.',
    day: 'день',
    hour: 'час',
    minute: 'мин.',
    am: 'AM',
    pm: 'PM',
  },
};

type DateTimePickerProps = Omit<DatePickerProps, 'initialValue' | 'maxDate' | 'minDate'> & {
  initialValue?: string;
  formItemName: string;
  maxDate?: string;
  minDate?: string;
  iconColor?: 'PRIMARY' | 'SECONDARY' | 'DARK_GREY' | 'PLACEHOLDER';
  setVisible: (val: boolean) => void;
};
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  precision = 'day',
  format = 'DD.MM.YYYY',
  minDate,
  maxDate,
  initialValue,
  formItemName,
  iconColor = 'PRIMARY',
  visible,
  setVisible,
  ...props
}) => {
  const form = Form.useFormInstance();
  const hasFieldValue = !!form.getFieldValue(formItemName);

  const onDateChange = (val: Date) => {
    const formattedDate = moment(val).format('DD.MM.YYYY HH:mm');
    form.setFieldsValue({ [formItemName]: formattedDate });
  };

  return (
    <DatePicker
      defaultValue={initialValue ? convertStrToDate(initialValue) : undefined}
      filter={{
        hour: (val: number) => (val >= 8 && val <= 22) || val === 0,
      }}
      format={format}
      itemStyle={styles.itemStyle}
      locale={dateTimePickerLocale}
      maxDate={maxDate ? convertStrToDate(maxDate) : undefined}
      minDate={minDate ? convertStrToDate(minDate) : undefined}
      value={form.getFieldValue(formItemName) || undefined}
      precision={precision}
      renderLabel={labelRenderer}
      style={styles.container}
      styles={{
        actionText: styles.actionButtonText,
        dismissText: styles.dismissButtonText,
        header: styles.header,
      }}
      visible={visible}
      onVisibleChange={(v) => {
        setVisible(v);
      }}
      onOk={onDateChange}
      {...props}
    >
      <Pressable style={styles.pressableField} onPress={() => setVisible(true)}>
        <Text style={hasFieldValue ? styles.innerFieldHasValue : styles.innerFieldIsPlaceholder}>
          {hasFieldValue ? moment(form.getFieldValue(formItemName)).format('DD.MM.YYYY HH:mm').toString() : 'Выберите дату'}
        </Text>
        <Icon name={'calendar'} color={Colours[iconColor]} size={20} />
      </Pressable>
    </DatePicker>
  );
};

export default DateTimePicker;
