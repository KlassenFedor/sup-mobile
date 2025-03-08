import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  navItemContainer: {
    alignItems: 'center',
    backgroundColor: Colours.PEACH,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 22,
    paddingHorizontal: 0,
    paddingBottom: 26,
    width: 80,
  },
  iconArea: { backgroundColor: Colours.PEACH, borderRadius: 16, flexDirection: 'column', padding: 0 },
  iconAreaActive: { backgroundColor: Colours.SECONDARY },
  iconWrapper: { flexDirection: 'column', paddingBlock: 4, paddingHorizontal: 20 },
});
