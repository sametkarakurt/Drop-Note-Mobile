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
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Context } from "../../Store/context";
import NoteService from "../../Services/noteService";
import Modal from "react-native-modal";
const NoteCard = (data) => {
  const [user] = useAuth();
  const context = useContext(Context);
  const Service = new NoteService(user.token);
  const navigation = useNavigation();
  const [postDate, setPostDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState("");
  const windowWidth = Dimensions.get("window").width;
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
              <Avatar
                style={styles.avatar}
                label={
                  data.profileData
                    ? data.currentUser.nickname
                    : data.item.item.nickname
                }
                color="black"
              />

              <VStack style={styles.userInfo}>
                {data.item.item.is_anonymus == false ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!isModalVisible);
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
        <View style={styles.buttons}>
          {/* <TouchableOpacity
            onPress={async () => {
              // await Service.deleteNote(data.item.item.id);
              // context.changeNoteSituation();
            }}
            style={{ position: "absolute", right: "87.5%", bottom: 10 }}
          >
            <SimpleLineIcons name="like" size={20} />
          </TouchableOpacity> */}

          <Text style={{ position: "absolute", right: "83.5%", bottom: 10 }}>
            {data.item.item.likecount}
          </Text>
          {data.item.item.nickname === data.currentUser.nickname ||
          data.profileData ? (
            <TouchableOpacity
              onPress={async () => {
                await Service.deleteNote(data.item.item.id);
                context.changeNoteSituation();
              }}
              style={{ position: "absolute", right: "7.5%", bottom: 10 }}
            >
              <Feather name="trash-2" size={20} />
            </TouchableOpacity>
          ) : null}
        </View>
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
    paddingBottom: 45,
    alignItems: "flex-start",
  },
  message: {
    fontStyle: "normal",
    lineHeight: 18,
    marginTop: 29.5,
    marginBottom: 2.5,
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
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttons: { marginVertical: -2.5 },
});
export default NoteCard;
