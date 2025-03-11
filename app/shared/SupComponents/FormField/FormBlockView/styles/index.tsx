import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingInline: 12,
    marginBottom: 8,
  },
  line: {
    width: '100%',
    borderColor: Colours.DARK_GREY,
    marginTop: 4,
    borderBottomWidth: 2,
  },
});
