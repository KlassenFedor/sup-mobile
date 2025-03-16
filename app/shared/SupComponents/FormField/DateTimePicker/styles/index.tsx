import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  actionButtonText: {
    color: Colours.PRIMARY,
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    width: '100%',
  },
  dismissButtonText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    backgroundColor: Colours.WHITE,
    borderBottomColor: Colours.DARK_GREY,
    borderBottomWidth: 2,
  },
  innerFieldIsPlaceholder: {
    color: Colours.PLACEHOLDER,
  },
  innerFieldHasValue: {
    color: 'rgba(0,0,0,0.87)',
  },
  itemStyle: {
    backgroundColor: 'rgba(238, 166, 149, 0.35)',
    borderColor: Colours.PRIMARY,
    borderRadius: 4,
    borderWidth: 1,
    marginBlock: -8,
    marginInline: -2,
  },
  pressableField: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: Colours.DARK_GREY,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingBlock: 4,
    paddingHorizontal: 12,
    width: '100%',
  },
});
