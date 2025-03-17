import { StyleSheet } from 'react-native';

export const otherStyles = StyleSheet.create({
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  fontSize14: {
    fontSize: 14,
  },
  fontSize16: {
    fontSize: 16,
  },
  fontSize18: {
    fontSize: 18,
  },
});

const commonStyles = {
  ...otherStyles,
};
export default commonStyles;
