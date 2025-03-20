import React, { useCallback, useEffect, useState } from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
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
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@ant-design/react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL, formatString, requests } from '../shared/api_requests';
import { getAccessToken, isAuthorized } from '../shared/helpers';
import axios from 'axios';
import { AbsenceStatus, AbsenceWithUserDTO } from '../shared/types';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  AbsenceDetails: { absenceId: string };
  EditAbsence: { absenceId: string };
};

type AbsenceDetailsRouteProp = RouteProp<RootStackParamList, 'AbsenceDetails'>;

const AbsenceDetailsScreen: React.FC = () => {
  const route = useRoute<AbsenceDetailsRouteProp>();
  const { absenceId } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [absence, setAbsence] = useState<AbsenceWithUserDTO | null>(null);
  const { logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchAbsenceData = async () => {
        try {
          if (!(await isAuthorized())) {
            logout();
            return; // Prevent further execution
          }
  
          const accessToken = await getAccessToken();
          const url = `${API_URL}/${formatString(requests.GET_ABSENCE, { id: absenceId })}`;
  
          console.log('Fetching:', url);
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
  
          const responseData = response.data?.data;
          if (!responseData) {
            throw new Error('Invalid API response format');
          }
  
          const newAbsence: AbsenceWithUserDTO = {
            id: responseData.id.toString(),
            documents: responseData.document_paths ? JSON.parse(responseData.document_paths) : [],
            startDate: responseData.start_date,
            endDate: responseData.end_date,
            status: responseData.status as AbsenceStatus,
            student: {
              fullName: responseData.user.fullName,
              email: responseData.user.email,
            },
          };
  
          setAbsence(newAbsence);
        } catch (error) {
          Alert.alert('Ошибка', 'Не удалось получить данные пропуска');
          console.error(error);
        }
      };
  
      fetchAbsenceData();
    }, [absenceId])
  );

  useEffect(() => {
    console.log('Updated Absence:', absence);
  }, [absence]);

  const goBack = () => navigation.goBack();
  const openEditScreen = () => navigation.navigate('EditAbsence', { absenceId });

  if (!absence) {
    return <Text>Загрузка...</Text>;
  }

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
      />
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
                  <FormBlockViewField title="ФИО студента:" value={absence.student.fullName} />
                </FormBlockView>
                <FormBlockView>
                  <FormBlockViewField title="Период:" />
                  <FormBlockViewField iconName="calendar" title="с:" value={absence.startDate} />
                  <FormBlockViewField iconName="calendar" title="по:" value={absence.endDate} />
                </FormBlockView>
                <FormBlockView>
                  <FormBlockViewField
                    title="Статус:"
                    value={`${AbsenceStatusToRussian[absence.status as 'pending' | 'approved' | 'rejected']}`}
                  />
                </FormBlockView>
              </View>

              <View>
                <FormFieldsBlockTitle title="Вложения" style={{ marginTop: 24 }} />
                <FormBlockView>
                  <FormBlockViewField title="Документы:" value={absence.documents.length > 0 ? 'есть' : 'нет'} />
                  {absence.documents.map((file, index) => (
                    <FormBlockViewField key={index} title={file} iconName="filetext1" />
                  ))}
                </FormBlockView>
              </View>

              <Button
                wrap
                type={(absence.status === 'approved') ? 'ghost' : 'warning'}
                onPress={openEditScreen}
                disabled={!(absence.status === 'approved')} 
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
