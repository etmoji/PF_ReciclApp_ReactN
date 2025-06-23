import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import PlasticScreen from '../screens/PlasticScreen';
import PaperScreen from '../screens/PaperScreen';
import MetalScreen from '../screens/MetalScreen';
import HomeScreen from '../screens/HomeScreen';
import CardboardScreen from '../screens/CardBoardScreen';
import OtherScreen from '../screens/OtherScreen'; 
import CompostScreen from '../screens/CompostScreen'; 
import GlassScreen from '../screens/GlassScreen'; 
import WelcomeScreen from '../screens/WelcomeScreen';
import CenterScreen from '../screens/CenterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}    
      />
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
      <Stack.Screen
        name="PaperScreen"
        component={PaperScreen}
        options={{ title: 'Reciclaje de Papel' }}
      />
      <Stack.Screen
        name="MetalScreen"
        component={MetalScreen}
        options={{ title: 'Reciclaje de Metal' }}
      />
      <Stack.Screen
        name="CardboardScreen"
        component={CardboardScreen}
        options={{ title: 'Reciclaje de Cartón' }}
      />
      <Stack.Screen
        name="OtherScreen"
        component={OtherScreen} 
        options={{ title: 'Reciclaje de Otros Materiales' }}
      />
      <Stack.Screen
        name="CompostScreen"
        component={CompostScreen}
        options={{ title: 'Reciclaje de Composta' }}
      />
      <Stack.Screen
        name="GlassScreen"
        component={GlassScreen}
        options={{ title: 'Reciclaje de Vidrio' }}
      />
      <Stack.Screen
        name="CenterDetailsScreen"
        component={CenterScreen}
        options={{ title: 'Centro de Acopio' }}
      />              
    </Stack.Navigator>
  );
}
