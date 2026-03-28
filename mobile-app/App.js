import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./app/Login";
import RegisterStep1 from "./app/RegisterStep1";
import RegisterStep2 from "./app/RegisterStep2";
import ForgotPassword from "./app/ForgotPassword";
import Welcome from "./app/Welcome";
import Home from "./app/Home";
import Lessons from "./app/Lessons";
import LessonsEii from "./app/LessonsEii";
import LessonsDai from "./app/LessonsDai";
import LessonsTc from "./app/LessonsTc";
import LessonsCg from "./app/LessonsCg";
import SubjectLessons from "./app/SubjectLessons";
import LessonDetails from "./app/LessonDetails";
import Messages from "./app/Messages";
import Posts from "./app/Posts";
import Ai from "./app/Ai";
import Account from "./app/Account";
import Help from "./app/Help";
import Report from "./app/Report";
import Settings from "./app/Settings";

import { LanguageProvider } from "./src/utils/LanguageContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right"
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
          <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Home" component={Home} />

          {/* Lessons */}
          <Stack.Screen name="Lessons" component={Lessons} />
          <Stack.Screen name="LessonsEii" component={LessonsEii} />
          <Stack.Screen name="LessonsDai" component={LessonsDai} />
          <Stack.Screen name="LessonsTc" component={LessonsTc} />
          <Stack.Screen name="LessonsCg" component={LessonsCg} />
          <Stack.Screen name="SubjectLessons" component={SubjectLessons} />
          <Stack.Screen name="LessonDetails" component={LessonDetails} />

          {/* Services */}
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Ai" component={Ai} />

          {/* Other pages */}
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}