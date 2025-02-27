import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

// Define the type for a single card
type CardItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

// Sample data for the cards
const cardData: CardItem[] = [
  {
    id: '1',
    title: 'Project Alpha',
    startDate: '2023-10-01',
    endDate: '2023-10-15',
  },
  {
    id: '2',
    title: 'Project Beta',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
  },
  {
    id: '3',
    title: 'Project Gamma',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
  },
  {
    id: '4',
    title: 'Project Delta',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
];

// Card component
const Card = ({ title, startDate, endDate }: CardItem) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>Start Date: {startDate}</Text>
      <Text style={styles.cardText}>End Date: {endDate}</Text>
    </View>
  );
};

// Main screen component
const MyAbsencesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        )}
        scrollEnabled={false} // Disable FlatList scrolling since ScrollView is used
      />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyAbsencesScreen;