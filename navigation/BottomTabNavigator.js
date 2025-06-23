import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import ScanScreen from '../screens/ScanScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#6B8E23',
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            height: 60,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cámara') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Opciones') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Cámara" component={ScanScreen} />
        <Tab.Screen name="Opciones" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
