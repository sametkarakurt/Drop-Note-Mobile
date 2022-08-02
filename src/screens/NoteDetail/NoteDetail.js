import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
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
          setData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [context.notesSituation]);

  const renderItem = (item) => (
    <NoteCard item={item} currentUser={currentUser} />
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {data.length > 0 ? (
        <FlatList data={data} renderItem={renderItem} />
      ) : (
        <Text>Not ekleyen olmamış. İlk notu siz ekleyin.</Text>
      )}

      <FAB
        placement="right"
        onPress={() => {
          navigation.navigate("TakeNote", { key: route.params.key });
        }}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="black"
        style={styles.fab}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 5,
    bottom: 10,
  },
});
export default NoteDetail;
