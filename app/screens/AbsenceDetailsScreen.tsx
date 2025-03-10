import React from 'react';
import { Text, ScrollView } from 'react-native';
import { ScreenDataWrapper, ScreenHeader } from '@sup-components';
import Icon from 'react-native-vector-icons/Feather';
import { Colours } from '../shared/constants';
import { NavigationType } from '../context/NavigationContext';

type AbsenceDetailsScreenType = {
  navigation: NavigationType;
  route: any;
};

const AbsenceDetailsScreen: React.FC<AbsenceDetailsScreenType> = ({ navigation, route }) => {
  const { absenceId } = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScreenHeader
        headerTitle={
          <Text>
            <Text style={{ color: Colours.BLACK }}>Пропуск </Text>
            {`№${absenceId}`}
          </Text>
        }
        backButtonTitle={<Icon name="arrow-left" size={24} color={Colours.SECONDARY} />}
        onBackPress={goBack}
        actionButtonTitle="редактировать"
        onActionButtonPress={() => {}}
      ></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ScrollView></ScrollView>
      </ScreenDataWrapper>
    </>
  );
};

export default AbsenceDetailsScreen;
