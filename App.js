import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
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
import Ionicons from "react-native-vector-icons/Ionicons";
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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="HomeTabNavigator"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="TakeNote"
        component={TakeNote}
        options={({ route }) => ({
          headerBackTitle: "Vazgeç",
          title: route.params.title,
          saveData: route.params.saveData,
          headerRight: () => (
            <TouchableOpacity
              onPress={route.params.saveData}
              title="Info"
              color="#fff"
            >
              <Ionicons size={24} color={"white"} name={"save-outline"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetail}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitle: "",
        })}
      />
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
