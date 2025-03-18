import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Form, View, Text } from '@ant-design/react-native';
import * as DocumentPicker from 'expo-document-picker';
import {
  Button,
  ContentBlock,
  DateTimePicker,
  FormBlockView,
  FormBlockViewField,
  FormFieldsBlockTitle,
  FormItem,
  Icon,
  ScreenDataWrapper,
  ScreenHeader,
} from '@sup-components';
import { NavigationType } from '../context/NavigationContext';
import { AbsenceStatusToRussian, Colours } from '../shared/constants';
import { convertStrToDate, getAccessToken } from '../shared/helpers';
import moment from 'moment';
import { API_URL, formatString, requests } from '../shared/api_requests';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AbsenceDTO, AbsenceWithUserDTO, UserProfileDTO } from '../shared/types';

type RootStackParamList = {
  EditAbsence: { absenceId: string };
};
type EditAbsenceRouteProp = RouteProp<RootStackParamList, 'EditAbsence'>;

const EditAbsenceScreen: React.FC<{ navigation: NavigationType }> = ({ navigation }) => {
  const [form] = Form.useForm();
  const [dateVisible, setDateVisible] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [absenceToEdit, setAbsenceToEdit] = useState<AbsenceWithUserDTO | null>(null);
  const startDate = Form.useWatch('startDate', form);
  const endDate = Form.useWatch('endDate', form);
  const route = useRoute<EditAbsenceRouteProp>();
  const { absenceId } = route.params;

  useEffect(() => {
    const fetchAbsenceData = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get<AbsenceDTO>(
          `${API_URL}/${formatString(requests.GET_ABSENCE, { id: absenceId })}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const studentResponse = await axios.get<UserProfileDTO>(`${API_URL}/${requests.PROFILE}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setAbsenceToEdit({
          id: response.data.id,
          files: response.data.files || [],
          name: response.data.name,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          status: response.data.status,
          student: studentResponse.data,
        });
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось получить данные пропуска');
        console.error(error);
      }
    };

    fetchAbsenceData();
  }, [absenceId]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleAttachFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (result.assets) {
      setAttachedFiles((prevFiles) => [...prevFiles, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!absenceToEdit) {
        alert('Ошибка: Данные отсутствуют.');
        return;
      }

      const token = await getAccessToken();
      if (!token) {
        alert('Ошибка: Токен не найден. Авторизуйтесь заново.');
        return;
      }

      if (!startDate || !endDate) {
        alert('Пожалуйста, выберите даты.');
        return;
      }

      const formData = new FormData();
      formData.append('startDate', moment(startDate).format('YYYY-MM-DD HH:mm'));
      formData.append('endDate', moment(endDate).format('YYYY-MM-DD HH:mm'));

      attachedFiles.forEach((file, index) => {
        formData.append(`files`, {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        } as any);
      });

      const response = await axios.post(
        `${API_URL}/${formatString(requests.EXTEND_ABSENCE, { id: absenceToEdit.id })}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      alert('Данные успешно отправлены!');
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Ошибка при отправке данных.');
    }
  };

  if (!absenceToEdit) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <>
      <ScreenHeader
        headerTitle="Редактирование"
        backButtonTitle="отмена"
        onBackPress={goBack}
        actionButtonTitle="сохранить"
        onActionButtonPress={handleSubmit}
      />
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ContentBlock style={{ backgroundColor: Colours.WHITE, borderRadius: 12 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Form name="edit-absence-details" form={form} layout="vertical" preserve={false}>
              <FormFieldsBlockTitle title="Полная информация" />
              <FormBlockView>
                <FormBlockViewField title="ФИО студента:" value={absenceToEdit.student.name} />
              </FormBlockView>
              <FormBlockView>
                <FormBlockViewField title="Период:" />
                <FormBlockViewField iconName="calendar-alt" iconLib="FontAwesome5" title="с:" value={absenceToEdit.startDate} />
                <FormItem label="по:" name={'endDate'} initialValue={convertStrToDate(absenceToEdit.endDate)} rules={[{ required: true }]}>
                  <DateTimePicker
                    format={'DD.MM.YYYY HH:mm'}
                    formItemName="endDate"
                    minDate={absenceToEdit.endDate}
                    precision={'minute'}
                    visible={dateVisible}
                    setVisible={setDateVisible}
                  />
                </FormItem>
              </FormBlockView>
              <FormBlockView>
                <FormBlockViewField
                  title="Статус:"
                  value={AbsenceStatusToRussian[absenceToEdit.status as 'checking' | 'approved' | 'rejected']}
                />
              </FormBlockView>

              <FormFieldsBlockTitle title="Вложения" />
              <FormBlockViewField title="Документы:" value={absenceToEdit.files.length.toString()} />

              <Button onPress={handleAttachFile} wrap type="ghost" style={{ borderWidth: 2, marginBottom: 12, marginTop: 8 }}>
                <Icon name="upload" size={20} color={Colours.PRIMARY} />
                <Text style={{ color: Colours.PRIMARY, marginLeft: 4 }}>Прикрепить документы</Text>
              </Button>
            </Form>
          </ScrollView>
        </ContentBlock>
      </ScreenDataWrapper>
    </>
  );
};

export default EditAbsenceScreen;