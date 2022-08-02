import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import UserService from "../../Services/userService";
import { StyleSheet } from "react-native";
import { useAuth } from "../../Store/AuthContext";
const HomeScreen = ({ navigation }) => {
  const [user] = useAuth();
  const Service = new UserService(user.token);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const updateSearch = (search) => {
    setSearch(search);
  };
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const getData = async () => {
      await Service.getCurrentUser()
        .then((response) => {
          console.log(response);
          setCurrentUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          width: "90%",
        }}
      >
        <Text style={styles.hello}>Hello,</Text>
        <Text style={styles.nickName}>{currentUser.nickname}</Text>
      </View>

      <View style={styles.card}>
        <View style={{ alignItems: "flex-start", justifyContent: "flex-end" }}>
          <Text style={styles.cardTitle}>Search and Write a Note</Text>
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
                navigation.navigate("NoteDetail", {
                  title: search,
                  key: search,
                });
              }
            }}
          >
            Search
          </Button>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E232C",
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
    lineHeight: 32,
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
  hello: {
    fontWeight: "bold",
    fontSize: 46,
    lineHeight: 52,
    fontStyle: "normal",
    letterSpacing: 1,
  },
  nickName: {
    fontWeight: "normal",
    fontSize: 36,
    color: "#A1A4B2",
    lineHeight: 42,
    fontStyle: "normal",
    marginBottom: 30,
  },
});
export default HomeScreen;
