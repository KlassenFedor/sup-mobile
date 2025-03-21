import { DocumentPickerAsset } from 'expo-document-picker';
import { StyleProp, ViewStyle } from 'react-native';

export type StylesType = StyleProp<ViewStyle>;

export const CardStatus = {
  ON_CHECKING: 'ON_CHECKING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export type AbsenceStatus = 'pending' | 'approved' | 'rejected';

export interface AbsenceDTO {
  id: string;
  documents: string[];
  name: string;
  startDate: string;
  endDate: string;
  status: AbsenceStatus;
}

export interface UserProfileDTO {
  fullName: string;
  surname?: string;
  patronym?: string;
  email: string;
  group_number?: number;
  courseNumber?: string | number;
}

export interface fileDTO {
  name: string;
  url: string;
  mimeType: string;
}

export interface AbsenceWithUserDTO {
  id: string;
  reason?: string;
  name?: string;
  startDate: string;
  endDate: string;
  status: AbsenceStatus;
  documents: string[];
  student: UserProfileDTO;
}
