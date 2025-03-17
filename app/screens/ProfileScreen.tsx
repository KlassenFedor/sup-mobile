import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Colours, UserMock } from '../shared/constants';
import { UserProfileDTO } from '../shared/types';
import {
  ContentBlock,
  ScreenDataWrapper,
  ScreenHeader,
  Avatar,
  FormFieldsBlockTitle,
  FormBlockView,
  FormBlockViewField,
  Button,
} from '@sup-components';

const API_URL = 'http://10.0.2.2:8000';

type RootStackParamList = {
  Auth: undefined; // Auth screen
  Tabs: undefined; // Bottom tab navigation
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tabs'>;

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [user, setUser] = useState<UserProfileDTO | null>(UserMock);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Auth'); // Replace Tabs with Auth screen
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('refreshToken');
        const refreshTokenResponse = await axios.post(`${API_URL}/refresh`, { token: token });
        await AsyncStorage.setItem('accessToken', refreshTokenResponse.data['access_token']);
        const newToken = await AsyncStorage.getItem('accessToken');

        const response = await axios.get<UserProfileDTO>(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });

        setUser(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch profile');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // fetchUserProfile();
  }, []);

  return (
    <>
      <ScreenHeader headerTitle="Профиль" headerBlockStyle={{ backgroundColor: 'transparent' }}></ScreenHeader>
      <ScreenDataWrapper style={{ paddingBottom: 0 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopColor: 'transparent', borderTopWidth: 0 }}>
            <ContentBlock style={{ alignItems: 'center', paddingTop: 36, zIndex: 1000 }}>
              <Avatar size={92} />
            </ContentBlock>
            {user ? (
              <ContentBlock style={styles.relativeContentBlock}>
                <ContentBlock flexDirection="row" justifyContent="center">
                  <Text style={{ fontWeight: '600', fontSize: 18 }}>
                    {user?.surname} {user?.name}
                  </Text>
                </ContentBlock>
                <ContentBlock>
                  <View>
                    <FormFieldsBlockTitle title="Данные пользователя" style={{ marginTop: 8 }} />
                    <FormBlockView>
                      <FormBlockViewField title="ФИО:" value={`${user?.surname} ${user?.name} ${user?.patronym}`} />
                    </FormBlockView>
                    <FormBlockView>
                      <FormBlockViewField title="Email:" value={user?.email} />
                    </FormBlockView>
                    <FormBlockView>
                      <FormBlockViewField title="Группа:" value={user?.groupCode} />
                    </FormBlockView>
                    <FormBlockView>
                      <FormBlockViewField title="Курс:" value={user?.courseNumber.toString()} />
                    </FormBlockView>
                  </View>

                  <View>
                    <FormFieldsBlockTitle title="Прочее" style={{ marginTop: 16 }} />
                    <Button wrap styleType="blank" onPress={logout}>
                      <Text style={{ color: Colours.PRIMARY, fontSize: 14, paddingLeft: 12 }}>ВЫЙТИ</Text>
                    </Button>
                  </View>
                </ContentBlock>
              </ContentBlock>
            ) : (
              <>
                <Text style={styles.errorText}>Не удалось загрузить профиль</Text>
                <Button styleType="blank" onPress={logout}>
                  <Text style={{ color: Colours.PRIMARY, fontSize: 14 }}>ВЫЙТИ</Text>
                </Button>
              </>
            )}
          </ScrollView>
        )}
      </ScreenDataWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  relativeContentBlock: {
    backgroundColor: Colours.WHITE,
    borderRadius: 12,
    position: 'relative',
    top: -42,
    paddingTop: 34,
    height: '100%',
    flexGrow: 1,
    paddingInline: 0,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;
