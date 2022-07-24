import * as React from "react";
import { Text, View } from "react-native";
import HomeScreen from "../../Screens/HomeScreen/homeScreen";
import ProfileScreen from "../../Screens/ProfileScreen/profileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
function NoteCard(data) {
  return (
    <View>
      <Text>{data.item.item.notetext ?? "Anonymous"}</Text>
    </View>
  );
}

export default NoteCard;
