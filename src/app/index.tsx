// src/app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  console.log('Expo Router: Home screen rendering');
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App is working with Expo Router!</Text>
      <Text style={styles.subtitle}>This is the home screen</Text>
      <Button 
        title="Go to Debug Screen" 
        onPress={() => router.push('/debug')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center'
  }
});