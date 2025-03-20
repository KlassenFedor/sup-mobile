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
import { AbsenceStatusToRussian, Colours, ServerDateFormat } from '../shared/constants';
import { convertStrToDate, getAccessToken, isAuthorized } from '../shared/helpers';
import moment from 'moment';
import { API_URL, formatString, requests } from '../shared/api_requests';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AbsenceDTO, AbsenceStatus, AbsenceWithUserDTO, UserProfileDTO } from '../shared/types';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  EditAbsence: { absenceId: string };
};
type EditAbsenceRouteProp = RouteProp<RootStackParamList, 'EditAbsence'>;

const EditAbsenceScreen: React.FC<{ navigation: NavigationType }> = ({ navigation }) => {
  const [form] = Form.useForm();
  const [dateVisible, setDateVisible] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [absenceToEdit, setAbsenceToEdit] = useState<AbsenceWithUserDTO | null>(null);
  const endDate = Form.useWatch('endDate', form);
  const route = useRoute<EditAbsenceRouteProp>();
  const { absenceId } = route.params;
  const { logout } = useAuth();

  useEffect(() => {
    const fetchAbsenceData = async () => {
      try {
        if (!(await isAuthorized())) {
          logout();
          return;
        }
        const accessToken = await getAccessToken();
        const url = `${API_URL}/${formatString(requests.GET_ABSENCE, { id: absenceId })}`;
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

        console.log('Fetched absence data:', newAbsence);
        setAbsenceToEdit(newAbsence);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось получить данные пропуска');
        console.error(error);
      }
    };

    fetchAbsenceData();
  }, [absenceId]);

    useEffect(() => {
      console.log('Updated Absence:', absenceToEdit);
    }, [absenceToEdit]);

  const goBack = () => navigation.goBack();

  const handleAttachFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*', multiple: true });
  
      if (result.canceled || !result.assets) {
        console.log('User canceled file selection.');
        return;
      }
  
      setAttachedFiles((prevFiles) => [...prevFiles, ...result.assets]);
    } catch (err) {
      console.error('Ошибка выбора файла:', err);
    }
  };  

  const handleDeleteFile = (fileName: string) => {
    setAttachedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async () => {
    try {
      if (!absenceToEdit) {
        Alert.alert('Ошибка', 'Данные отсутствуют.');
        return;
      }

      const token = await getAccessToken();
      if (!token) {
        Alert.alert('Ошибка', 'Авторизуйтесь заново.');
        return;
      }

      if (!absenceToEdit.startDate || !endDate) {
        Alert.alert('Ошибка', 'Выберите даты.');
        return;
      }

      const formData = new FormData();
      formData.append('new_end_date', moment(endDate).format(ServerDateFormat));
      attachedFiles.forEach((file) => {
        if (file?.uri) {
          formData.append('documents[]', {
            uri: file.uri,
            name: file.name || `file_${Date.now()}`, 
            type: file.mimeType || 'application/octet-stream', 
          } as any);
        }
      });

      console.log(formData);
      const response = await axios.post(
        `${API_URL}/${formatString(requests.EXTEND_ABSENCE, { skip: absenceToEdit.id })}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Ответ сервера:', response.data);
      Alert.alert('Успешно', 'Данные обновлены.');
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      Alert.alert('Ошибка', 'Не удалось отправить данные.');
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
          <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopColor: 'transparent', borderTopWidth: 0 }}>
            <Form
              name="edit-absence-details"
              form={form}
              layout="vertical"
              style={{ backgroundColor: Colours.WHITE }}
              preserve={false}
            >
              <FormFieldsBlockTitle title="Полная информация" style={{ marginTop: 8 }} />
              <FormBlockView>
                <FormBlockViewField title="ФИО студента:" value={`${absenceToEdit.student.fullName}`} />
              </FormBlockView>
              <FormBlockView style={{ alignItems: 'stretch' }}>
                <FormBlockViewField title="Период:" />
                <FormBlockViewField iconName="calendar-alt" iconLib="FontAwesome5" title="с:" value={moment(absenceToEdit.startDate).format(ServerDateFormat)} />
                <FormItem
                  label="по:"
                  name={'endDate'}
                  initialValue={absenceToEdit.endDate ? moment(absenceToEdit.endDate).format(ServerDateFormat) : undefined}
                  rules={[{ required: true }]}
                >
                  <DateTimePicker
                    format={'DD.MM.YYYY'}
                    formItemName="endDate"
                    initialValue={moment(absenceToEdit.endDate).format(ServerDateFormat)}
                    minDate={moment(absenceToEdit.endDate).format(ServerDateFormat)}
                    precision={'day'}
                    visible={dateVisible}
                    setVisible={setDateVisible}
                  />
                </FormItem>
              </FormBlockView>
              <FormBlockView>
                <FormBlockViewField
                  title="Статус:"
                  value={`${AbsenceStatusToRussian[absenceToEdit.status as 'pending' | 'approved' | 'rejected']}`}
                />
              </FormBlockView>

              <FormFieldsBlockTitle title="Вложения" style={{ marginTop: 24 }} />
              <FormBlockView style={{ alignItems: 'stretch' }}>
                <FormBlockViewField title="Документы:" value={(attachedFiles.length + absenceToEdit.documents.length).toString()} />
                {absenceToEdit.documents.map((doc, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
                    <Icon name="filetext1" color={Colours.PRIMARY} style={{ marginRight: 4 }} />
                    <Text style={{ color: Colours.BLACK, fontSize: 14 }}>{doc}</Text>
                  </View>
                ))}
                {attachedFiles.length > 0 ? (
                  attachedFiles.map((file, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBlock: 4,
                        paddingInline: 4,
                        marginBottom: 4,
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name="filetext1" color={Colours.PRIMARY} style={{ marginRight: 4 }} />
                        <Text style={{ color: Colours.BLACK, fontSize: 14 }}>{file.name}</Text>
                      </View>
                      <Button
                        wrap
                        type="ghost"
                        style={{
                          borderColor: Colours.DANGER,
                          borderWidth: 2,
                          paddingBlock: 4,
                          paddingInline: 8,
                          height: 'auto',
                        }}
                        onPress={() => handleDeleteFile(file.name ?? 'default_filename')}
                      >
                        <Icon name="delete" color={Colours.DANGER} />
                      </Button>
                    </View>
                  ))
                ) : (
                  <Text style={{ color: Colours.DARK_GREY}}>Нет прикрепленных документов</Text>
                )}
              </FormBlockView>
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
