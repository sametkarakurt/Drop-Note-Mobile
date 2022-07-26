import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import HomeScreen from "../../Screens/HomeScreen/homeScreen";
import ProfileScreen from "../../Screens/ProfileScreen/profileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Card } from "@rneui/themed";
import { Stack, HStack, VStack } from "react-native-flex-layout";
import { Avatar } from "@react-native-material/core";
const { width: WIDTH } = Dimensions.get("window");
import { FAB } from "@rneui/themed";
1;
const NoteCard = (data) => {
  const [postDate, setPostDate] = useState("");
  React.useEffect(() => {
    console.log(data.item);
    const lastIndex = data.item.item.created_at.indexOf("T");
    setPostDate(data.item.item.created_at.substring(0, lastIndex));
  }, []);
  return (
    <View>
      <Card containerStyle={styles.card}>
        <VStack>
          <HStack>
            <Avatar style={styles.avatar} label="Kent Dodds" color="black" />
            <VStack style={styles.userInfo}>
              {data.item.item.is_anonymus == false ? (
                <Text style={styles.username}>Username</Text>
              ) : null}
              <Text style={styles.headline}>{postDate}</Text>
            </VStack>
          </HStack>
          <Text style={styles.message}>
            {data.item.item.notetext ?? "Anonymous"}
          </Text>
        </VStack>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    marginRight: 10,
  },
  card: {
    width: WIDTH - 40,
    borderRadius: 12,
    padding: 24,
    alignItems: "flex-start",
  },
  message: {
    fontStyle: "normal",
    lineHeight: 18,
    marginTop: 29.5,

    fontSize: 14,
    lineHeight: 18,
    color: "#666666",
  },
  userInfo: { marginLeft: 16 },
  avatar: { width: 56, height: 56 },
  username: {
    lineHeight: 23,
    fontSize: 18,
    width: 128,
    height: 23,
    marginBottom: 4,
  },
  headline: {
    width: 139,
    height: 18,
    color: "#666666",
    fontSize: 14,
    lineHeight: 18,
    display: "flex",
  },
});
export default NoteCard;
