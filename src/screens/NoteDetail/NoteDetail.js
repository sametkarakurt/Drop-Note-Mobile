import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { FAB } from "@rneui/themed";
import NoteCard from "../../Components/NoteCard/noteCard";
import NoteService from "../../Services/noteService";
import { Context } from "../../Store/context";
import { useAuth } from "../../Store/AuthContext";
import { LogBox } from "react-native";
import UserService from "../../Services/userService";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);
[];

const NoteDetail = ({ navigation, route }) => {
  const context = useContext(Context);
  const [user] = useAuth();
  const [data, setData] = useState([]);
  const Service = new NoteService(user.token);
  const userService = new UserService(user.token);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    console.log(route.params.key);
    const getData = async () => {
      await userService
        .getCurrentUser()
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
      await Service.fetchNote(route.params.key)
        .then((response) => {
          console.log(response);
          setData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [context.notesSituation]);

  const renderItem = (item) => (
    <NoteCard item={item} currentUser={currentUser} profileData={false} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.alertNote}>
          Not ekleyen olmamış. İlk notu siz ekleyin.
        </Text>
      )}

      <FAB
        placement="right"
        onPress={() => {
          navigation.navigate("TakeNote", {
            title: route.params.key,
            key: route.params.key,
          });
        }}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="black"
        style={styles.fab}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 5,
    bottom: 10,
  },
  alertNote: {
    color: "black",
    paddingTop: 30,
    padding: 30,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
  },
});
export default NoteDetail;
