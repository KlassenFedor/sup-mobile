import { StyleProp, ViewStyle } from 'react-native';

export type StylesType = StyleProp<ViewStyle>;

export const CardStatus = {
  ON_CHECKING: 'ON_CHECKING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export type AbsenceStatus = 'checking' | 'approved' | 'rejected';

export interface AbsenceDTO {
  hasAttachedDocs: boolean;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: AbsenceStatus;
}
