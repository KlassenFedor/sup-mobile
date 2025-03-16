import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Form, View, Text } from '@ant-design/react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
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
import { AbsenceStatusToRussian, Colours } from '../shared/constants';
import { convertStrToDate } from '../shared/helpers';
import { AbsenceMock as absenceToEdit } from '../shared/constants';

type RootStackParamList = {
  EditAbsence: { absenceId: string };
};
type EditAbsenceRouteProp = RouteProp<RootStackParamList, 'EditAbsence'>;

const EditAbsenceScreen: React.FC = ({ navigation }) => {
  const route = useRoute<EditAbsenceRouteProp>();
  const [form] = Form.useForm();
  const [dateVisible, setDateVisible] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const { absenceId } = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  const handleAttachFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Allow all file types
      copyToCacheDirectory: true, // Cache the file for easier access
    });

    if (result.assets) {
      setAttachedFiles([...attachedFiles]);
    }
  };

  console.log('formValues', form.getFieldsValue());

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
              form={form}
              layout="vertical"
              style={{ backgroundColor: Colours.WHITE }}
              styles={{ BodyBottomLine: { height: 0 }, Body: { borderTopColor: 'transparent', borderTopWidth: 0 } }}
              preserve={false}
            >
              <FormFieldsBlockTitle title="Полная информация" style={{ marginTop: 8 }} />
              <FormBlockView>
                <FormBlockViewField
                  title="ФИО студента:"
                  value={`${absenceToEdit.student.surname} ${absenceToEdit.student.name} ${absenceToEdit.student.patronymic}`}
                />
              </FormBlockView>
              <FormBlockView style={{ alignItems: 'stretch' }}>
                <FormBlockViewField title="Период:" />
                <FormBlockViewField iconName="calendar-alt" iconLib="FontAwesome5" title="с:" value={absenceToEdit.startDate} />
                <FormItem
                  label="по:"
                  name={'endDate'}
                  initialValue={absenceToEdit.endDate ? convertStrToDate(absenceToEdit.endDate) : undefined}
                  rules={[{ required: true }]}
                >
                  <DateTimePicker
                    format={'DD.MM.YYYY HH:mm'}
                    formItemName="endDate"
                    initialValue={absenceToEdit.endDate}
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
                  value={`${AbsenceStatusToRussian[absenceToEdit.status as 'checking' | 'approved' | 'rejected']}`}
                />
              </FormBlockView>

              <FormFieldsBlockTitle title="Вложения" style={{ marginTop: 24 }} />
              <FormBlockView style={{ alignItems: 'stretch' }}>
                <FormBlockViewField title="Документы:" value={(absenceToEdit.files || []).length.toString()} />
                {absenceToEdit.files &&
                  absenceToEdit.files.map((file, index) => (
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
                        <Text style={{ color: Colours.BLACK, fontSize: 14 }}>{file}</Text>
                      </View>
                      <Button
                        wrap
                        type="ghost"
                        style={{ borderColor: Colours.DANGER, borderWidth: 2, paddingBlock: 4, paddingInline: 8, height: 'auto' }}
                        onPress={() => {
                          console.log('file to delete', file);
                        }}
                      >
                        <Icon name="delete" color={Colours.DANGER} />
                      </Button>
                    </View>
                  ))}
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
