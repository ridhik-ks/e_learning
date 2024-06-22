import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Otp from './src/screens/Otp';
import NameScreen from './src/screens/NameScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import Home from './src/screens/home';
import TodayLecture from './src/screens/todayLecture';
import Profile from './src/screens/Profile';
import Class from './src/screens/Class';
import AppNavigator from './src/components/AppNavigator';



const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <Home />;
}

function TodayLectureScreen() {
  return <TodayLecture />;
}

function ProfileScreen() {
  return <Profile />;
}


export default function App() {
  return (
    <AppNavigator />
  );
};

