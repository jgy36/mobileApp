// src/app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { View, Text } from 'react-native';

// Simple loading fallback for PersistGate
const LoadingView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading app state...</Text>
  </View>
);

export default function RootLayout() {
  console.log('Expo Router: RootLayout rendering');
  
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}