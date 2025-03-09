import { StyleProp, ViewStyle } from 'react-native';

export type StylesType = StyleProp<ViewStyle>;

export const CardStatus = {
  ON_CHECKING: 'ON_CHECKING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export type AbsenceStatus = 'checking' | 'approved' | 'rejected';

export interface AbsenceDTO {
  id: string;
  files: string[];
  name: string;
  startDate: string;
  endDate: string;
  status: AbsenceStatus;
}
