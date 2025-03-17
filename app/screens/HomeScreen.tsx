import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardItem, ScreenDataWrapper, ScreenHeader } from '@sup-components';
import { AbsenceDTO } from '../shared/types';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbsenceDetails'>;

const cardData: AbsenceDTO[] = [
  {
    id: '2021',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 2021',
    startDate: '03.03.2025',
    endDate: '07.03.2025',
    status: 'checking',
  },
  {
    id: '1000',
    files: [],
    name: 'Пропуск № 1000',
    startDate: '28.02.2025',
    endDate: '28.02.2025',
    status: 'checking',
  },
  {
    id: '1810',
    files: ['file1.pdf', 'file2.pdf'],
    name: 'Пропуск № 1810',
    startDate: '13.03.2025',
    endDate: '20.03.2025',
    status: 'checking',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <>
      <ScreenHeader headerTitle="Пропуски на проверке"></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <FlatList
          data={cardData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('AbsenceDetails', { absenceId: item.id })}>
              <CardItem cardData={item} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScreenDataWrapper>
    </>
  );
};

export default HomeScreen;
