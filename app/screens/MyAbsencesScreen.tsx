import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, RefreshControl, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define the type for a single card
type CardItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  files: string[]; // Array of file URLs
};

// Card component
const Card = ({ title, startDate, endDate, status, files }: CardItem) => {
  const handleViewFiles = () => {
    if (files.length === 0) {
      Alert.alert('No Files', 'No attached files for this absence.');
    } else {
      Alert.alert('Attached Files', files.join('\n')); // Display files in an alert
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>Start Date: {startDate}</Text>
      <Text style={styles.cardText}>End Date: {endDate}</Text>
      <Text style={styles.cardText}>Status: {status}</Text>
      <Button title="Прикрепленные файлы" onPress={handleViewFiles} />
    </View>
  );
};


const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken'); // Retrieve token
    if (token !== null) {
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};


// Main screen component
const MyAbsencesScreen: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const API_URL = 'http://10.0.2.2:8000'; // Replace with your actual API endpoint

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const response = await axios.get(`${API_URL}/cards`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the token in Authorization header
        },
      });
      setData(response.data); // Ensure API returns an array of cards
    } catch (error) {
      Alert.alert('Error', 'Failed to load absences data.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh function for pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card {...item} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
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
    marginBottom: 4,
  },
});

export default MyAbsencesScreen;