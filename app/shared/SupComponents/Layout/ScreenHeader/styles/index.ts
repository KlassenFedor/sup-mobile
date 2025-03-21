import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  blankBtnText: {
    color: Colours.SECONDARY,
    fontSize: 16,
  },
  headerTitle: {
    color: Colours.PRIMARY,
    fontSize: 28,
    fontWeight: '600',
    marginTop: 12,
  },
  screenHeaderBlock: {
    backgroundColor: Colours.WHITE,
    marginBottom: 0,
    paddingTop: 22,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.1)',
  },
});
