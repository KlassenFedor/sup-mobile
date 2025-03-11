import React from 'react';
import { ScrollView } from 'react-native';
import { ContentBlock, FormFieldsBlockTitle, ScreenDataWrapper, ScreenHeader } from '@sup-components';
import { Colours } from '../shared/constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Form } from '@ant-design/react-native';

type RootStackParamList = {
  EditAbsence: { absenceId: string };
};
type EditAbsenceRouteProp = RouteProp<RootStackParamList, 'EditAbsence'>;

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

const EditAbsenceScreen: React.FC = ({ navigation }) => {
  const route = useRoute<EditAbsenceRouteProp>();
  const { absenceId } = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScreenHeader
        headerTitle="Редактирование"
        backButtonTitle="отмена"
        onBackPress={goBack}
        actionButtonTitle="сохранить"
        onActionButtonPress={() => {}}
      ></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ContentBlock style={{ backgroundColor: Colours.WHITE, borderRadius: 12 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopColor: 'transparent', borderTopWidth: 0 }}>
            <Form
              name="edit-absence-details"
              style={{ backgroundColor: Colours.WHITE }}
              styles={{ BodyBottomLine: { height: 0 }, Body: { borderTopColor: 'transparent', borderTopWidth: 0 } }}
            >
              <FormFieldsBlockTitle title="Полная информация" style={{ marginTop: 8 }} />

              <FormFieldsBlockTitle title="Вложения" style={{ marginTop: 24 }} />
            </Form>
          </ScrollView>
        </ContentBlock>
      </ScreenDataWrapper>
    </>
  );
};

export default EditAbsenceScreen;
