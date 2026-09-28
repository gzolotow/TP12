import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

export type RootStackParamList = { Tabs: undefined; PostDetail: { postId: string } };
export type TabParamList = { Feed: undefined; Profile: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>{route.name === 'Feed' ? '⌂' : '◉'}</Text>,
    tabBarActiveTintColor: '#111',
    tabBarInactiveTintColor: '#8e8e8e',
  })}>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>;
}

export default function AppNavigator() {
  return <NavigationContainer><Stack.Navigator>
    <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ presentation: 'modal', headerShown: false }} />
  </Stack.Navigator></NavigationContainer>;
}
