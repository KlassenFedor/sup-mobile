import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  avatarCircle: {
    alignItems: 'center',
    backgroundColor: Colours.WHITE,
    borderColor: 'transparent',
    borderRadius: '50%',
    borderWidth: 0,
    display: 'flex',
    fontSize: 32,
    justifyContent: 'center',
    height: 64,
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 64,
  },
  imageStyle: {
    borderRadius: '50%',
    height: 56,
    width: 56,
  },
});
