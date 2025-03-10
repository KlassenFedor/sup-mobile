import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  TabsLayout: undefined;
  MyAbsences: undefined;
  Profile: undefined;
  AddAbsenceScreen: undefined;
  AbsenceDetails: { absenceId: string };
};

export type NavigationType = NavigationProp<RootStackParamList>;

export interface NavigationStateType {
  index: number;
  routes: Array<RouteProp<RootStackParamList, keyof RootStackParamList>>;
}

export interface NavigationContextType {
  navigation: NavigationType;
  state: NavigationStateType;
}

export type RootStackParamListKeys = keyof RootStackParamList;
