import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const inputRequired = StyleSheet.create({
  false: {
    display: 'none',
  },
  true: {
    color: Colours.PRIMARY,
    marginRight: 4,
  },
});

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    margin: 0,
    marginBottom: 12,
    width: '100%',
  },
  input: {
    backgroundColor: Colours.WHITE,
    borderColor: Colours.DARK_GREY,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 14,
    height: 40,
    paddingBlock: 4,
    paddingHorizontal: 12,
  },
  inputFocused: {
    borderColor: Colours.SECONDARY,
    boxShadow: '0px 0px 0px 2px rgba(238, 166, 149, 0.2)',
    outlineColor: Colours.SECONDARY,
    shadowOffset: { width: -1, height: -1 },
  },
  inputWrapper: {
    borderWidth: 0,
    padding: 0,
  },
  labelBlock: {
    paddingBottom: 8,
  },
});
