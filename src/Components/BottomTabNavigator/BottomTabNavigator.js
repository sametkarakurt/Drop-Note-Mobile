import * as React from "react";
import { Text, View } from "react-native";
import HomeScreen from "../../Screens/HomeScreen/homeScreen";
import ProfileScreen from "../../Screens/ProfileScreen/profileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
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

export default BottomTabNavigator;
