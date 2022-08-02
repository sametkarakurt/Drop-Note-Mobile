import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../Store/AuthContext";
import { Card } from "@rneui/themed";
import { Stack, HStack, VStack } from "react-native-flex-layout";
import { Avatar } from "@react-native-material/core";
const { width: WIDTH } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import MessageService from "../../Services/messageService";
1;
import Feather from "react-native-vector-icons/Feather";
const NoteCard = (data) => {
  const [user] = useAuth();
  const Service = new MessageService(user.token);
  const navigation = useNavigation();
  const [postDate, setPostDate] = useState("");

  const [userData, setUserData] = useState("");
  React.useEffect(() => {
    if (data.item.item.created_at) {
      const lastIndex = data.item.item.created_at.indexOf("T");
      setPostDate(data.item.item.created_at.substring(0, lastIndex));
    }
  }, []);
  return (
    <View>
      <Card containerStyle={styles.card}>
        <VStack>
          <HStack>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserProfile", {
                  guestId: data.item.item.userid,
                });
              }}
            >
              <Avatar
                style={styles.avatar}
                label={
                  data.profileData
                    ? data.currentUser.nickname
                    : data.item.item.nickname
                }
                color="black"
              />
            </TouchableOpacity>
            <VStack style={styles.userInfo}>
              {data.item.item.is_anonymus == false ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("UserProfile", {
                      guestId: data.item.item.userid,
                    });
                  }}
                >
                  <Text style={styles.username}>
                    {data.profileData
                      ? data.currentUser.nickname
                      : data.item.item.nickname}
                  </Text>
                </TouchableOpacity>
              ) : null}
              <Text style={styles.headline}>{postDate}</Text>
            </VStack>
          </HStack>
          <Text style={styles.message}>
            {data.item.item.notetext ?? "Anonymous"}
          </Text>
        </VStack>
      </Card>
      {data.item.item.nickname === data.currentUser.nickname ||
      data.profileData ? (
        <TouchableOpacity
          onPress={() => {
            Service.deleteMessage({
              id: data.item.item.userid,
              message: data.item.item.notetext,
            });
          }}
          style={{ position: "absolute", right: 30, bottom: 10 }}
        >
          <Feather name="trash-2" size={20} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
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
