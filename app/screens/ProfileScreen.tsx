import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { API_URL, requests } from '../shared/api_requests';
import { getAccessToken, isAuthorized } from '../shared/helpers';

type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth' | 'Tabs'>;

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [user, setUser] = useState<UserProfileDTO | null>(UserMock);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (await isAuthorized() === false) {
          console.log('not authorized');
          logout();
        }
        const accessToken = await getAccessToken();
        const response = await axios.get<UserProfileDTO>(`${API_URL}/${requests.PROFILE}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось загрузить профиль');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
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
                      <FormBlockViewField title="ФИО:" value={`${user?.name}`} />
                    </FormBlockView>
                    <FormBlockView>
                      <FormBlockViewField title="Email:" value={user?.email} />
                    </FormBlockView>
                    <FormBlockView>
                      <FormBlockViewField title="Группа:" value={user?.groupCode} />
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
