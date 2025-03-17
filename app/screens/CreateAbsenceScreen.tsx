import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ContentBlock, DateTimePicker, FormItem, ScreenDataWrapper, ScreenHeader, Button, Icon } from '@sup-components';
import { Colours } from '../shared/constants';
import { NavigationType } from '../context/NavigationContext';
import { Form, Text } from '@ant-design/react-native';
import moment from 'moment';
import axios from 'axios';
import { API_URL, requests } from '../shared/api_requests';
import { getAccessToken } from '../shared/helpers';

const CreateAbsenceScreen: React.FC<{
  navigation: NavigationType;
}> = ({ navigation }) => {
  const [form] = Form.useForm();
  const [startDateVisible, setStartDateVisible] = useState(false);
  const startDate = Form.useWatch('startDate', form);

  const [endDateVisible, setEndDateVisible] = useState(false);
  const endDate = Form.useWatch('endDate', form);
  const [attachedFiles, setAttachedFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  console.log('create formValues', form.getFieldsValue());

  const handleAttachFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (result.assets) {
      setAttachedFiles([...attachedFiles]);
    }
  };

  const handleSubmit = async () => {
    try {
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
        startDate: moment(startDate).format('YYYY-MM-DD HH:mm'),
        endDate: moment(endDate).format('YYYY-MM-DD HH:mm'),
        attachedFiles: attachedFiles.map((file) => ({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        })),
      };
  
      console.log('Sending data:', absenceData);
  
      const formData = new FormData();
      formData.append('startDate', absenceData.startDate);
      formData.append('endDate', absenceData.endDate);
  
      attachedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        } as any);
      });
  
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
