import React from 'react';
import { Card, Flex, View } from '@ant-design/react-native';
import { Text } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AbsenceDTO, AbsenceStatus } from '@/app/shared/types';
import { AbsenceStatusToRussian, Colours } from '@constants';
import { styles } from './styles';
import { Alert } from 'react-native';
import { Button, Span } from '@sup-components';

type CardProps = {
  cardData: AbsenceDTO;
};

const getCardStatusColor = (status: AbsenceStatus): string => {
  switch (status) {
    case 'checking':
    default:
      return Colours.ON_CHECKING_STATUS;
    case 'approved':
      return Colours.APPROVED_STATUS;
    case 'rejected':
      return Colours.REJECTED_STATUS;
  }
};

const CardItem: React.FC<CardProps> = ({ cardData }) => {
  const { name, startDate, endDate, status, files } = cardData;
  const hasAttachedDocs = files && files.length > 0;

  const handleViewFiles = () => {
    if (files.length === 0) {
      Alert.alert('No Files', 'No attached files for this absence.');
    } else {
      Alert.alert('Attached Files', files.join('\n')); // Display files in an alert
    }
  };

  return (
    <Card style={styles.card}>
      <Flex justify="between" align="start">
        <Flex.Item style={{ padding: 16 }}>
          <Flex justify="start" style={{ marginBottom: 8 }}>
            <Span style={styles.cardTitleText}>{name}</Span>
            <Icon
              size={20}
              name={hasAttachedDocs ? 'file-check-outline' : 'file-remove-outline'}
              color={hasAttachedDocs ? Colours.PRIMARY : '#A4A4A4'}
            />
          </Flex>
          <Text style={styles.cardText}>с: {startDate}</Text>
          <Text style={styles.cardText}>по: {endDate}</Text>
          <Text style={styles.cardText}>статус: {AbsenceStatusToRussian[status]}</Text>
          <Flex justify="start" style={{ marginTop: 8 }}>
            <Button type="ghost" styleType="ghost" style={{ height: 'auto', paddingBlock: 4 }} onPress={handleViewFiles}>
              <Text style={[styles.cardText, { color: Colours.PRIMARY }]}>Прикрепленные файлы</Text>
            </Button>
          </Flex>
        </Flex.Item>
        <View style={{ backgroundColor: getCardStatusColor(status), width: 18, height: '100%' }} />
      </Flex>
    </Card>
  );
};

export default CardItem;
