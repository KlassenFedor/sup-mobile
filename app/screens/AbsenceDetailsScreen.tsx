import React from 'react';
import { Text, ScrollView } from 'react-native';
import { ScreenDataWrapper, ScreenHeader } from '@sup-components';
import Icon from 'react-native-vector-icons/Feather';
import { Colours } from '../shared/constants';
import { NavigationType } from '../context/NavigationContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
};
type AbsenceDetailsRouteProp = RouteProp<RootStackParamList, 'AbsenceDetails'>;

const AbsenceDetailsScreen: React.FC = () => {
  const route = useRoute<AbsenceDetailsRouteProp>();
  const { absenceId } = route.params;
  console.log(route.params)
  const navigation = useNavigation<AbsenceDetailsRouteProp>();
  // const goBack = () => {
  //   navigation.goBack();
  // };

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
        // onBackPress={goBack}
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
