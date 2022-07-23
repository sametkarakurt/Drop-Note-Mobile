import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TakeNote from "./src/Screens/TakeNote/takeNote";
import BottomTabNavigator from "./src/Components/BottomTabNavigator/BottomTabNavigator";
const Tab = createBottomTabNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabNavigator"
          options={{ headerShown: false }}
          component={BottomTabNavigator}
        />
        <Stack.Screen name="TakeNote" component={TakeNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
