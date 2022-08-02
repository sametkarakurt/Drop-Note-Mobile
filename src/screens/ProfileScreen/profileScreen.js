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
import { useAuth } from "../../Store/AuthContext";
import UserService from "../../Services/userService";
import NoteService from "../../Services/noteService";
import Entypo from "react-native-vector-icons/Entypo";
import NoteCard from "../../Components/NoteCard/noteCard";
const ProfileScreen = () => {
  const [user, setUser] = useAuth();
  const userService = new UserService(user.token);

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
            .getUserNotes(response.id)
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
  }, []);

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
            console.log("logout");
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
      <Text>{currentUser ? currentUser.nickname : "Kullanıcı yok"}</Text>
      <Text>{currentUser ? currentUser.email : null}</Text>
      {userNotes.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 75 }}
          data={userNotes}
          renderItem={renderItem}
        />
      ) : (
        <Text>Not ekleyen olmamış. İlk notu siz ekleyin.</Text>
      )}

      <Button
        title="Çık"
        onPress={() => {
          setUser(null);
        }}
      ></Button>
    </SafeAreaView>
  );
};

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
});

export default ProfileScreen;
