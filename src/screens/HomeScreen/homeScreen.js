import React, { useState, useContext } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";

import { StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
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
        onPress={async () => {
          navigation.navigate("NoteDetail", { key: search });
        }}
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", marginTop: 20 }}
      >
        Ara
      </Button>
    </SafeAreaView>
  );
};
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
