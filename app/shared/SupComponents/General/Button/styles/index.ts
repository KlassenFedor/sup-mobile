import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = {
  all: StyleSheet.create({
    common: {
      height: 36,
      textAlign: 'center',
    },
  }),
  type: {
    blank: StyleSheet.create({
      common: {
        backgroundColor: 'none',
        borderRadius: 0,
        borderWidth: 0,
        color: Colours.SECONDARY,
        fontSize: 18,
        height: 'auto',
        paddingLeft: 0,
        paddingRight: 0,
      },
      onPressed: {
        color: `${Colours.SECONDARY}99`,
      },
    }),
    ghost: StyleSheet.create({
      common: {
        backgroundColor: Colours.WHITE,
        borderColor: Colours.PRIMARY,
        borderStyle: 'solid',
        borderWidth: 1,
        color: Colours.PRIMARY,
      },
      onPressed: {
        backgroundColor: 'transparent',
        color: `${Colours.PRIMARY}99`,
      },
    }),
    primary: StyleSheet.create({
      common: {
        backgroundColor: Colours.PRIMARY,
        borderColor: Colours.PRIMARY,
        borderStyle: 'solid',
        borderWidth: 1,
        color: Colours.WHITE,
      },
      onPressed: {
        backgroundColor: Colours.PRIMARY_DARKEN_10,
        borderColor: Colours.PRIMARY_DARKEN_10,
      },
    }),
    warning: StyleSheet.create({
      common: {},
      onPressed: {},
    }),
  },
};
