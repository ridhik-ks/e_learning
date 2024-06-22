import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';

import Login from '../screens/Login';
import Otp from '../screens/Otp';
import NameScreen from '../screens/NameScreen';
import PasswordScreen from '../screens/PasswordScreen';
import Home from '../screens/home';
import TodayLecture from '../screens/todayLecture';
import Profile from '../screens/Profile';
import Class from '../screens/Class';
import CreateAccount from '../screens/CreateAccount';

import HomeWhite from '../assets/images/Home g.svg';
import HomeDark from '../assets/images/Home b.svg';
import ClassLight from '../assets/images/class-light.svg';
import ClassDark from '../assets/images/class-dark.svg';
import ProfileLight from '../assets/images/profile.svg';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function ClassStack() {
  return (
    <Stack.Navigator initialRouteName="TodayLecture">
      <Stack.Screen name="TodayLectureScreen" component={TodayLecture} options={{ headerShown: false }} />
      <Stack.Screen name="ClassScreen" component={Class} options={{ title: 'Class', headerShown: false }} />
    </Stack.Navigator>
  );
}

function CreateAccountStack() {
  return (
    <Stack.Navigator initialRouteName="CreateAccountScreen">
      <Stack.Screen name="CreateAccountScreen" component={CreateAccount} options={{ headerShown: false }} />
      <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function CreateToOtpStack() {
  return (
    <Stack.Navigator initialRouteName="CreateAccountScreen">
      <Stack.Screen name="CreateAccountScreen" component={CreateAccount} options={{ headerShown: false }} />
      <Stack.Screen name="OtpScreen" component={Otp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function JoinStack() {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="OtpScreen" component={Otp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function NameScreenStack() {
  return (
    <Stack.Navigator initialRouteName='OtpScreen'>
      <Stack.Screen name="OtpScreen" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function PasswordScreenStack() {
  return (
    <Stack.Navigator initialRouteName='NameScreen'>
      <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

function HomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName='NameScreen'>
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AppTabs() {

  const route = useRoute();
  const name = route.params?.name || '';

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          let fillColor;

          if (route.name === 'Home') {
            IconComponent = focused ? HomeDark : HomeWhite;
          } else if (route.name === 'TodayLecture') {
            IconComponent = focused ? ClassDark : ClassLight;
          } else if (route.name === 'Profile') {
            IconComponent = ProfileLight;
          }

          return <IconComponent width={30} height={30} fill={fillColor} />;
        },
        tabBarStyle: {
          display: 'flex',
          height: 70,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: '#fff',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} initialParams={{ name }}/>
      <Tab.Screen name="TodayLecture" component={ClassStack} />
      <Tab.Screen name="Profile" component={Profile} initialParams={{ name }}/>
    </Tab.Navigator>
  );
}

function AuthStack(){
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='JoinStack' component={JoinStack} options={{ headerShown: false }} />
      <Stack.Screen name='CreateAccountStack' component={CreateAccountStack} options={{ headerShown: false }} />
      <Stack.Screen name='CreateToOtpStack' component={CreateToOtpStack} options={{ headerShown: false }} />
      <Stack.Screen name='NameScreenStack' component={NameScreenStack} options={{ headerShown: false }} />
      <Stack.Screen name='PasswordScreenStack' component={PasswordScreenStack} options={{ headerShown: false }} />
      <Stack.Screen name='HomeScreenStack' component={HomeScreenStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNavigator;
