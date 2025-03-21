import { StyleSheet } from 'react-native';
import { Colours } from '@constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingBottom: 0,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    width: 'auto',
  },
  cardText: {
    fontSize: 14,
    color: Colours.CARD_BODY_TEXT,
  },
  fileIcon: {},
});
