// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './src/utils/LanguageContext';

// صفحات التطبيق
import Login from './app/Login';
import RegisterStep1 from './app/RegisterStep1';
import RegisterStep2 from './app/RegisterStep2';
import Report from './app/Report';
import Home from './app/Home';
import Lessons from './app/Lessons';
import Posts from './app/Posts';
import Messages from './app/Messages';
import Account from './app/Account';
import Help from './app/Help';
import ForgotPassword from './app/ForgotPassword';
import Welcome from './app/Welcome';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
        <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Lessons" component={Lessons} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}