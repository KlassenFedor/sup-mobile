import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ContentBlock, DateTimePicker, FormItem, ScreenDataWrapper, ScreenHeader, Button, Icon } from '@sup-components';
import { Colours, ServerDateFormat } from '../shared/constants';
import { NavigationType } from '../context/NavigationContext';
import { Form, Text } from '@ant-design/react-native';
import moment from 'moment';
import axios from 'axios';
import { API_URL, requests } from '../shared/api_requests';
import { getAccessToken, isAuthorized } from '../shared/helpers';
import { useAuth } from '../context/AuthContext';

const CreateAbsenceScreen: React.FC<{
  navigation: NavigationType;
}> = ({ navigation }) => {
  const [form] = Form.useForm();
  const [startDateVisible, setStartDateVisible] = useState(false);
  const startDate = Form.useWatch('startDate', form);
  const { logout } = useAuth();
  const [endDateVisible, setEndDateVisible] = useState(false);
  const endDate = Form.useWatch('endDate', form);
  const [attachedFiles, setAttachedFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  console.log('create formValues', form.getFieldsValue());

  const handleAttachFile = async () => {
    try {
      console.log('test');
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
        copyToCacheDirectory: true,
      });
  
      if (!result.assets) return; 
  
      const newFiles = result.assets.filter(
        (file) => !attachedFiles.some((existingFile) => existingFile.uri === file.uri)
      );
  
      if (newFiles.length > 0) {
        setAttachedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      } else {
        alert('Вы уже прикрепили этот файл.');
      }
    } catch (error) {
      console.error('Ошибка при выборе файла:', error);
      alert('Не удалось прикрепить файл. Попробуйте снова.');
    }
  };

  const handleSubmit = async () => {
    try {
      if (await isAuthorized() === false) {
        logout();
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
  
      const absenceData = {
        start_date: moment(startDate).format(ServerDateFormat),
        end_date: moment(endDate).format(ServerDateFormat),
        attached_files: attachedFiles
      };

      const formData = new FormData();
      formData.append('start_date', absenceData.start_date);
      formData.append('end_date', absenceData.end_date);
      absenceData.attached_files.forEach((file) => {
        if (file?.uri) {
          formData.append('documents[]', {
            uri: file.uri,
            name: file.name || `file_${Date.now()}`, 
            type: file.mimeType || 'application/octet-stream', 
          } as any);
        }
      });

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(`${API_URL}/${requests.CREATE_ABSENCE}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
      alert('Данные успешно отправлены!');
  
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка отправки:', error);
      console.error(error.request);
      console.error(error.message);
      alert('Ошибка при отправке данных.');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScreenHeader
        headerTitle="Создать пропуск"
        backButtonTitle={<Icon iconLib="Feather" name="arrow-left" size={24} color={Colours.SECONDARY} />}
        onBackPress={goBack}
        actionButtonTitle="сохранить"
        onActionButtonPress={handleSubmit}
      ></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ContentBlock style={{ backgroundColor: Colours.WHITE, borderRadius: 12 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopColor: 'transparent', borderTopWidth: 0 }}>
            <Form
              name="create-new-absence-form"
              form={form}
              layout="vertical"
              preserve={false}
              style={{ backgroundColor: Colours.WHITE }}
              styles={{ BodyBottomLine: { height: 0 }, Body: { borderTopColor: 'transparent', borderTopWidth: 0 } }}
            >
              <FormItem label="Дата с:" name={'startDate'} initialValue={undefined} rules={[{ required: true }]}>
                <DateTimePicker
                  format={'DD.MM.YYYY HH:mm'}
                  formItemName="startDate"
                  iconColor="PLACEHOLDER"
                  initialValue={moment().startOf('day').format('DD.MM.YYYY HH:mm').toString()}
                  minDate={moment().startOf('day').format('DD.MM.YYYY HH:mm').toString()}
                  maxDate={endDate ? moment(endDate).format('DD.MM.YYYY HH:mm').toString() : undefined}
                  precision={'minute'}
                  visible={startDateVisible}
                  setVisible={setStartDateVisible}
                />
              </FormItem>
              <FormItem label="Дата по:" name={'endDate'} initialValue={undefined} rules={[{ required: true }]}>
                <DateTimePicker
                  format={'DD.MM.YYYY HH:mm'}
                  formItemName="endDate"
                  iconColor="PLACEHOLDER"
                  initialValue={endDate || undefined}
                  minDate={
                    startDate
                      ? moment(startDate).format('DD.MM.YYYY HH:mm').toString()
                      : moment().endOf('day').format('DD.MM.YYYY HH:mm').toString()
                  }
                  precision={'minute'}
                  visible={endDateVisible}
                  setVisible={setEndDateVisible}
                />
              </FormItem>

              <ContentBlock alignItems="center" style={{ padding: 0 }}>
                <Button onPress={handleAttachFile} wrap type="ghost" style={{ borderWidth: 2, marginBottom: 4, marginTop: 16 }}>
                  <Icon iconLib="Feather" name="upload" color={Colours.PRIMARY} />
                  <Text style={{ color: Colours.PRIMARY, marginLeft: 4 }}>Прикрепить документы</Text>
                </Button>
              </ContentBlock>
              {attachedFiles.length > 0 && (
                <View style={styles.fileList}>
                  <Text style={styles.fileListTitle}>Прикрепленные файлы:</Text>
                  {attachedFiles.map((file, index) => (
                    <Text key={index} style={styles.fileName}>
                      {file.name}
                    </Text>
                  ))}
                </View>
              )}
            </Form>
            <Button onPress={handleSubmit} type="primary" style={{ marginTop: 24, marginBottom: 8 }}>
              Отправить
            </Button>
          </ScrollView>
        </ContentBlock>
      </ScreenDataWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  fileList: {
    marginTop: 16,
  },
  fileListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#666',
  },
});

export default CreateAbsenceScreen;
