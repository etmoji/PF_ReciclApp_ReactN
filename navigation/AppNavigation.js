import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import PlasticScreen from '../screens/PlasticScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlasticScreen"
        component={PlasticScreen}
        options={{ title: 'Reciclaje de Plástico' }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
