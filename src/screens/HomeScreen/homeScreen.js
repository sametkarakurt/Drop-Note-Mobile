import React, { useState, useContext } from "react";
import { Text, View } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
        alignItems: "center",
      }}
    >
      <View style={styles.card}>
        <View style={{ alignItems: "flex-start", justifyContent: "flex-end" }}>
          <Text style={styles.cardTitle}>Hello , search and write a note</Text>
        </View>

        <Searchbar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          style={styles.searchbar}
          inputStyle={styles.searchbarInput}
        />
        <View style={{ alignItems: "center" }}>
          <Button
            color="white"
            textColor="red"
            style={styles.searchButton}
            mode="contained"
            onPress={async () => {
              if (search.length > 0) {
                navigation.navigate("NoteDetail", { key: search });
              }
            }}
          >
            Search
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    width: "95%",

    borderRadius: 30,

    justifyContent: "flex-end",
  },
  cardTitle: {
    color: "white",
    width: 190,
    height: 101,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: "32",
    marginHorizontal: 20,
    marginTop: 26,
  },
  searchButton: {
    marginBottom: 20,
    marginTop: 16,
    borderRadius: 20,
    height: 40,
    width: 125,
    justifyContent: "center",
  },
  item: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchbar: {
    width: "90%",
    borderRadius: 100,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchbarInput: {
    color: "black",
  },
});
export default HomeScreen;
