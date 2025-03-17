import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import {
  Button,
  ContentBlock,
  FormBlockView,
  FormBlockViewField,
  FormFieldsBlockTitle,
  Icon,
  ScreenDataWrapper,
  ScreenHeader,
} from '@sup-components';
import { AbsenceStatusToRussian, Colours } from '../shared/constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@ant-design/react-native';
import { AbsenceMock as absence } from '../shared/constants';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
  EditAbsence: { absenceId: string };
};
type AbsenceDetailsRouteProp = RouteProp<RootStackParamList, 'AbsenceDetails'>;

const AbsenceDetailsScreen: React.FC = () => {
  const route = useRoute<AbsenceDetailsRouteProp>();
  const { absenceId } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const goBack = () => {
    navigation.goBack();
  };

  const openEditScreen = () => {
    navigation.navigate('EditAbsence', { absenceId: absenceId });
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
        backButtonTitle={<Icon iconLib="Feather" name="arrow-left" size={24} color={Colours.SECONDARY} />}
        onBackPress={goBack}
        actionButtonTitle="редактировать"
        onActionButtonPress={openEditScreen}
      ></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ContentBlock style={{ backgroundColor: Colours.WHITE, borderRadius: 12 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopColor: 'transparent', borderTopWidth: 0 }}>
            <Form
              name="view-absence-details"
              style={{ backgroundColor: Colours.WHITE }}
              styles={{ BodyBottomLine: { height: 0 }, Body: { borderTopColor: 'transparent', borderTopWidth: 0 } }}
            >
              <View>
                <FormFieldsBlockTitle title="Полная информация" style={{ marginTop: 8 }} />
                <FormBlockView>
                  <FormBlockViewField
                    title="ФИО студента:"
                    value={`${absence.student.surname} ${absence.student.name} ${absence.student.patronymic}`}
                  />
                </FormBlockView>
                <FormBlockView>
                  <FormBlockViewField title="Период:" />
                  <FormBlockViewField iconName="calendar" title="с:" value={absence.startDate} />
                  <FormBlockViewField iconName="calendar" title="по:" value={absence.endDate} />
                </FormBlockView>
                <FormBlockView>
                  <FormBlockViewField
                    title="Статус:"
                    value={`${AbsenceStatusToRussian[absence.status as 'checking' | 'approved' | 'rejected']}`}
                  />
                </FormBlockView>
              </View>

              <View>
                <FormFieldsBlockTitle title="Вложения" style={{ marginTop: 24 }} />
                <FormBlockView>
                  <FormBlockViewField title="Документы:" value={absence.files ? 'есть' : 'нет'} />
                  {absence.files &&
                    absence.files.map((file, index) => <FormBlockViewField key={index} title={file} iconName="filetext1" />)}
                </FormBlockView>
              </View>

              <Button
                wrap
                type="ghost"
                onPress={openEditScreen}
                style={{ marginTop: 16, marginLeft: 12, marginBottom: 12, borderWidth: 2, alignItems: 'flex-start' }}
              >
                Продлить пропуск
              </Button>
            </Form>
          </ScrollView>
        </ContentBlock>
      </ScreenDataWrapper>
    </>
  );
};

export default AbsenceDetailsScreen;
