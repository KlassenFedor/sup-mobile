import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingInline: 12,
    paddingBlock: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBlock: 4,
    paddingRight: 24,
  },
  title: {
    color: Colours.BLACK,
    fontSize: 14,
  },
  line: {
    width: '100%',
    borderColor: Colours.SECONDARY,
    borderBottomWidth: 3,
  },
});
