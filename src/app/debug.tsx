// src/app/debug.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function DebugScreen() {
  console.log('Expo Router: Debug screen rendering');
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Screen</Text>
      <Text style={styles.info}>If you can see this, navigation is working!</Text>
      <Button 
        title="Go Back" 
        onPress={() => router.back()}
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
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  info: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center'
  }
});