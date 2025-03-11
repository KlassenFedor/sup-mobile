import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Button,
  ContentBlock,
  FormBlockView,
  FormBlockViewField,
  FormFieldsBlockTitle,
  ScreenDataWrapper,
  ScreenHeader,
} from '@sup-components';
import Icon from 'react-native-vector-icons/Feather';
import { AbsenceStatusToRussian, Colours } from '../shared/constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Form } from '@ant-design/react-native';

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
};
type AbsenceDetailsRouteProp = RouteProp<RootStackParamList, 'AbsenceDetails'>;

const absence = {
  id: '2021',
  student: {
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    group: '111111',
    course: '2',
  },
  files: ['file1.pdf', 'file2.pdf'],
  name: 'Пропуск № 2021',
  startDate: '03.03.2025',
  endDate: '07.03.2025',
  status: 'checking',
};

const AbsenceDetailsScreen: React.FC = ({ navigation }) => {
  const route = useRoute<AbsenceDetailsRouteProp>();
  const { absenceId } = route.params;
  console.log(route.params)
  const goBack = () => {
    navigation.goBack();
  };

  const openEditScreen = () => {
    navigation.navigate('EditAbsence', { absenceId });
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
              <FormFieldsBlockTitle title="Полная информация" style={{ marginTop: 8 }} />
              <FormBlockView>
                <FormBlockViewField
                  title="ФИО студента:"
                  value={`${absence.student.surname} ${absence.student.name} ${absence.student.patronymic}`}
                />
              </FormBlockView>
              <FormBlockView>
                <FormBlockViewField
                  title="Статус:"
                  value={`${AbsenceStatusToRussian[absence.status as 'checking' | 'approved' | 'rejected']}`}
                />
              </FormBlockView>
              <FormBlockView>
                <FormBlockViewField title="Период:" />
                <FormBlockViewField iconName="calendar" title="с:" value={absence.startDate} />
                <FormBlockViewField iconName="calendar" title="по:" value={absence.endDate} />
              </FormBlockView>

              <FormFieldsBlockTitle title="Вложения" style={{ marginTop: 24 }} />
              <FormBlockView>
                <FormBlockViewField title="Документы:" value={absence.files ? 'есть' : 'нет'} />
                {absence.files &&
                  absence.files.map((file, index) => <FormBlockViewField key={index} title={file} iconName="filetext1" />)}
              </FormBlockView>

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
