import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { ScreenDataWrapper, ScreenHeader, CardItem } from '@sup-components';
import { AbsenceDTO } from '../shared/types';

const cardData: AbsenceDTO[] = [
  {
    hasAttachedDocs: true,
    id: '1',
    name: 'Пропуск № 2021',
    startDate: '03.03.2025',
    endDate: '07.03.2025',
    status: 'checking',
  },
  {
    hasAttachedDocs: false,
    id: '2',
    name: 'Пропуск № 956',
    startDate: '01.02.2025',
    endDate: '01.02.2025',
    status: 'rejected',
  },
  {
    hasAttachedDocs: true,
    id: '3',
    name: 'Пропуск № 989',
    startDate: '07.02.2025',
    endDate: '09.02.2025',
    status: 'approved',
  },
  {
    hasAttachedDocs: false,
    id: '4',
    name: 'Пропуск № 1000',
    startDate: '28.02.2025',
    endDate: '28.02.2025',
    status: 'checking',
  },
  {
    hasAttachedDocs: false,
    id: '5',
    name: 'Пропуск № 1010',
    startDate: '05.03.2025',
    endDate: '06.03.2025',
    status: 'rejected',
  },
  {
    hasAttachedDocs: true,
    id: '6',
    name: 'Пропуск № 1810',
    startDate: '13.03.2025',
    endDate: '20.03.2025',
    status: 'checking',
  },
];

// Main screen component
const MyAbsencesScreen: React.FC = () => {
  return (
    <>
      <ScreenHeader headerTitle="Мои пропуски"></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={cardData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardItem cardData={item} />}
            scrollEnabled={false} // Disable FlatList scrolling since ScrollView is used
          />
        </ScrollView>
      </ScreenDataWrapper>
    </>
  );
};

export default MyAbsencesScreen;
