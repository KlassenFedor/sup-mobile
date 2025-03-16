export enum Colours {
  BLACK = '#000000',
  DANGER = '#FF4D4F',
  DARK_GREY = '#E0E0E0',
  ON_CHECKING_STATUS = '#A3C4FF',
  APPROVED_STATUS = '#A3FFC3',
  REJECTED_STATUS = '#FF8F8F',
  ICON_COLOR = '#06201C',
  LIGHT_GREY = '#F2F2F2',
  CARD_BODY_TEXT = '#858585',
  PEACH = '#F0DBD6',
  PLACEHOLDER = '#888888',
  PRIMARY = '#DE4E2B',
  PRIMARY_DARKEN_10 = '#B93B1D',
  PRIMARY_DARK = '#B13E22',
  SECONDARY = '#EEA695',
  WHITE = '#FFFFFF',
}

export enum AbsenceStatusToRussian {
  checking = 'на проверке',
  approved = 'подтвержден',
  rejected = 'отклонен',
}

export const MonthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'];

export const ServerDateFormat = 'DD.MM.YYYY HH:mm';

export const AbsenceMock = {
  id: '2021',
  student: {
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    group: '111111',
    course: '2',
  },
  files: ['file1.pdf', 'file2.pdf'],
  name: 'Пропуск № 2021',
  startDate: '03.03.2025',
  endDate: '07.03.2025',
  status: 'checking',
};
