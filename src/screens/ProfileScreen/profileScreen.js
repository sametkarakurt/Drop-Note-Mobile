import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Divider } from "@rneui/base";
import { useAuth } from "../../Store/AuthContext";
import UserService from "../../Services/userService";
import NoteService from "../../Services/noteService";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NoteCard from "../../Components/NoteCard/noteCard";
import { Context } from "../../Store/context";
const ProfileScreen = () => {
  const [user, setUser] = useAuth();
  const userService = new UserService(user.token);
  const context = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await userService
        .getCurrentUser()
        .then((response) => {
          console.log(response);
          setCurrentUser(response);
          userService
            .getUserNotes(response.nickname)
            .then((response) => {
              console.log(response);
              setUserNotes(response);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [context.notesSituation]);

  const renderItem = (item) => (
    <NoteCard item={item} currentUser={currentUser} profileData={true} />
  );
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <View></View>
        <TouchableOpacity
          onPress={() => {
            setUser(null);
          }}
        >
          <Entypo
            name={"log-out"}
            style={styles.logout}
            color={"black"}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <FontAwesome
          style={styles.icon}
          name={"user-o"}
          color={"black"}
          size={24}
        />
        <Text style={styles.userInfoText}>
          {currentUser ? currentUser.nickname : "Kullanıcı yok"}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <FontAwesome
          style={styles.icon}
          name={"envelope-o"}
          color={"black"}
          size={24}
        />
        <Text style={styles.userInfoText}>
          {currentUser ? currentUser.email : null}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        Notlar
      </Text>
      <Divider
        width={1}
        color="black"
        style={{ width: "90%", marginTop: 10, marginHorizontal: 20 }}
      />
      {userNotes.length > 0 ? (
        <FlatList
          style={{ marginTop: 5, marginBottom: 140 }}
          contentContainerStyle={{ paddingBottom: 75 }}
          data={userNotes}
          renderItem={renderItem}
        />
      ) : null}
    </SafeAreaView>
  );
};

// export default () => {
//   return (
//     <Divider
//       style={{ width: "80%", margin: 20 }}
//       color="#2089dc"
//       insetType="left"
//       subHeader="React native elements"
//       subHeaderStyle={{}}
//       width={1}
//       orientation="horizontal"
//     />
//   );
// }

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#D7D2E0",
  },
  input: {
    backgroundColor: "#D0E3E7",
    marginTop: 33,

    overflow: "hidden",
  },
  title: {
    color: "#3A2E61",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 26,
    lineHeight: 31,
    letterSpacing: -0.165,
  },
  button: {
    backgroundColor: "#6955AA",
    height: 60,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonLabel: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 22,
  },
  userInfo: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  userInfoText: {
    fontSize: 20,
    fontStyle: "normal",
  },
});

export default ProfileScreen;
