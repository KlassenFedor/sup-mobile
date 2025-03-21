import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = {
  all: StyleSheet.create({
    common: {
      height: 36,
      textAlign: 'center',
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
  }),
  type: {
    blank: StyleSheet.create({
      common: {
        backgroundColor: 'none',
        borderRadius: 0,
        borderWidth: 0,
        height: 'auto',
        paddingLeft: 0,
        paddingRight: 0,
      },
      cardText: {
        color: Colours.SECONDARY,
        fontSize: 16,
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
      },
      cardText: {
        color: Colours.PRIMARY,
        fontSize: 16,
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
      },
      cardText: {
        color: Colours.WHITE,
        fontSize: 16,
      },
      onPressed: {
        backgroundColor: Colours.PRIMARY_DARKEN_10,
        borderColor: Colours.PRIMARY_DARKEN_10,
      },
    }),
    warning: StyleSheet.create({
      common: {},
      cardText: {},
      onPressed: {},
    }),
  },
};
