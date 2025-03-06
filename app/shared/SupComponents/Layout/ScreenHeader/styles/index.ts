import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  blankBtnText: {
    color: Colours.SECONDARY,
  },
  headerTitle: {
    color: Colours.PRIMARY,
    fontSize: 28,
    fontWeight: '600',
    marginTop: 12,
  },
  screenHeaderBlock: {
    backgroundColor: Colours.WHITE,
    marginTop: -8,
    marginHorizontal: -8,
    marginBottom: 0,
    paddingTop: 22,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
