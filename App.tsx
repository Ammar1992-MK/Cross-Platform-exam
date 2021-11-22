import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './Screens/StartScreen';
import CovidDataScreen from './Screens/CovidDataScreen';
import DetailsScreen from './Screens/DetailsScreen';

export default function App() {

  const Stack = createNativeStackNavigator();
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="CovidDataScreen" component={CovidDataScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
}

