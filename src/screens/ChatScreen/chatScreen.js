import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import MessageService from "../../Services/messageService";
import { StyleSheet } from "react-native";
import { Context } from "../../Store/context";
import { useAuth } from "../../Store/AuthContext";
const ChatScreen = ({ navigation, route }) => {
  const context = useContext(Context);
  const [user] = useAuth();
  const Service = new MessageService(user.token);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    console.log(route.params.guestId);
    async function setData() {
      var data = await Service.fetchMessage();
      setUserData(data);
    }
    setData();
  }, []);
  return <Text>{route.params.guestId}</Text>;
};
const styles = StyleSheet.create({});
export default ChatScreen;
