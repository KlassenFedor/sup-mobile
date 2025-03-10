import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenDataWrapper, ScreenHeader } from '@sup-components';
import Icon from 'react-native-vector-icons/Feather';
import { Colours } from '../shared/constants';
import { NavigationType } from '../context/NavigationContext';

const CreateAbsenceScreen: React.FC<{
  navigation: NavigationType;
}> = ({ navigation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  // Handle file attachment
  const handleAttachFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Allow all file types
      copyToCacheDirectory: true, // Cache the file for easier access
    });

    if (result.assets) {
      setAttachedFiles([...attachedFiles]);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Start Date:', startDate.toISOString().split('T')[0]);
    console.log('End Date:', endDate.toISOString().split('T')[0]);
    console.log('Attached Files:', attachedFiles);
    alert('Данные успешно отправлены!');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScreenHeader
        headerTitle="Создать пропуск"
        backButtonTitle={<Icon name="arrow-left" size={24} color={Colours.SECONDARY} />}
        onBackPress={goBack}
        actionButtonTitle="сохранить"
        onActionButtonPress={() => {}}
      ></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Start Date Input */}
          <Text style={styles.label}>Начало</Text>
          <Button
            title={`Select Start Date: ${startDate.toISOString().split('T')[0]}`}
            onPress={() => setShowStartDatePicker(true)}
          />
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) {
                  setStartDate(selectedDate);
                }
              }}
            />
          )}

          {/* End Date Input */}
          <Text style={styles.label}>Окончание</Text>
          <Button title={`Select End Date: ${endDate.toISOString().split('T')[0]}`} onPress={() => setShowEndDatePicker(true)} />
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}

          {/* File Attachment Field */}
          <Text style={styles.label}>Прикрепить файлы</Text>
          <Button title="Прикрепить файлы" onPress={handleAttachFile} />
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

          {/* Submit Button */}
          <View style={styles.submitButton}>
            <Button title="Отправить" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </ScreenDataWrapper>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
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
  submitButton: {
    marginTop: 24,
    marginRight: 100,
    marginLeft: 100,
  },
});

export default CreateAbsenceScreen;
