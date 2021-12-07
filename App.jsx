import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './Screens/StartScreen';
import CovidDataScreen from './Screens/CovidDataScreen';
import DetailsScreen from './Screens/DetailsScreen';
import MapScreen from './Screens/MapScreen'
import { Api } from './Api/CovidApi';
import { Provider } from 'react-redux';
import store from './Redux/store'
import ProfileScreen from './Screens/ProfileScreen';

export default function App(props) {

  const Stack = createNativeStackNavigator();
  return <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="CovidDataScreen" component={CovidDataScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
}

