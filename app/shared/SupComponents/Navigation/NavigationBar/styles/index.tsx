import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  navBarWrapper: {
    backgroundColor: Colours.PEACH,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24,
    boxShadow: '0px -2px 6px 2px rgba(0, 0, 0, 0.1)',
  },
});
