import * as React from "react";
import { Text, View } from "react-native";
import HomeScreen from "../../Screens/HomeScreen/homeScreen";
import ProfileScreen from "../../Screens/ProfileScreen/profileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          height: 92,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome color={"white"} name="home" size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome color={"white"} name="user" size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
