import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TakeNote from "./src/Screens/TakeNote/takeNote";
import BottomTabNavigator from "./src/Components/BottomTabNavigator/BottomTabNavigator";
import NoteDetail from "./src/Screens/NoteDetail/NoteDetail";
import ContextProvider from "./src/Store/context";
import WelcomeScreen from "./src/Screens/WelcomeScreen/welcomeScreen";
import LoginScreen from "./src/Screens/LoginScreen/loginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen/registerScreen";
const Tab = createBottomTabNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ContextProvider>
      <NavigationContainer>
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
          <Stack.Screen
            name="HomeTabNavigator"
            options={{ headerShown: false }}
            component={BottomTabNavigator}
          />
          <Stack.Screen name="TakeNote" component={TakeNote} />
          <Stack.Screen name="NoteDetail" component={NoteDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
