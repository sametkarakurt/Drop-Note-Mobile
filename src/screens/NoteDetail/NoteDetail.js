import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList } from "react-native";
import { FAB } from "@rneui/themed";
import NoteCard from "../../Components/NoteCard/noteCard";
import NoteService from "../../Services/noteService";
import { Context } from "../../Store/context";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);
[];
const renderItem = (item) => <NoteCard item={item} />;

const NoteDetail = ({ navigation, route }) => {
  const context = useContext(Context);
  const [data, setData] = useState([]);
  const Service = new NoteService();
  useEffect(() => {
    Service.fetchNote(route.params.key).then((response) => {
      setData(response);
    });
  }, [context.notesSituation]);

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
      />
    </View>
  );
};

export default NoteDetail;
