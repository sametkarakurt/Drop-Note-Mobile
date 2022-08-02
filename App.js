import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TakeNote from "./src/Screens/TakeNote/takeNote";
import BottomTabNavigator from "./src/Components/BottomTabNavigator/BottomTabNavigator";
import NoteDetail from "./src/Screens/NoteDetail/NoteDetail";
import ContextProvider from "./src/Store/context";
import WelcomeScreen from "./src/Screens/WelcomeScreen/welcomeScreen";
import LoginScreen from "./src/Screens/LoginScreen/loginScreen";
import NoteCard from "./src/Components/NoteCard/noteCard";
import RegisterScreen from "./src/Screens/RegisterScreen/registerScreen";
import { Context } from "./src/Store/context";
import AuthProvider, { useAuth } from "./src/Store/AuthContext";
import ChatScreen from "./src/Screens/ChatScreen/chatScreen";
import UserProfile from "./src/Screens/UserProfile/UserProfile";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [user] = useAuth();
  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabNavigator"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      <Stack.Screen name="TakeNote" component={TakeNote} />
      <Stack.Screen name="NoteDetail" component={NoteDetail} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ContextProvider>
          <Navigator />
        </ContextProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
