import React, { useState } from "react";
import { FAB } from "@rneui/themed";
import { Text, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import Entypo from "react-native-vector-icons/Entypo";
import {
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
} from "react-native";

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,

        marginHorizontal: 10,
        justifyContent: "center",
      }}
    >
      <SearchBar
        round="true"
        placeholder="Ara"
        onChangeText={updateSearch}
        value={search}
      />

      <Button
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", marginTop: 20 }}
      >
        Ara
      </Button>

      {/* <FAB
        placement="right"
        onPress={() => {
          navigation.push("TakeNote");
        }}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="black"
      /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default HomeScreen;
