import React, { useState, useContext } from "react";
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
import Feather from "react-native-vector-icons/Feather";
import { Context } from "../../Store/context";
import NoteService from "../../Services/noteService";
const NoteCard = (data) => {
  const [user] = useAuth();
  const context = useContext(Context);
  const Service = new NoteService(user.token);
  const navigation = useNavigation();
  const [postDate, setPostDate] = useState("");

  const [userData, setUserData] = useState("");
  React.useEffect(() => {
    if (data.item.item.created_at) {
      const lastIndex = data.item.item.created_at.indexOf("T");
      setPostDate(data.item.item.created_at.substring(0, lastIndex));
    }
  }, []);

  if (data.item.item.deleted_at == null) {
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
            onPress={async () => {
              await Service.deleteNote(data.item.item.id);
              context.changeNoteSituation();
            }}
            style={{ position: "absolute", right: 30, bottom: 10 }}
          >
            <Feather name="trash-2" size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  card: {
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
