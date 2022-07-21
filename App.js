import * as React from "react";
import { Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen/homeScreen";
import NoteScreen from "./src/screens/NoteScreen/noteScreen";
import ProfileScreen from "./src/screens/ProfileScreen/profileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="Note"
        component={NoteScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="edit" size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
