import React, { useState, useContext } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "@rneui/themed";
import NoteService from "../../Services/noteService";
import { Context } from "../../Store/context";
import { useAuth } from "../../Store/AuthContext";
const TakeNote = ({ navigation, route }) => {
  const context = useContext(Context);
  const [user] = useAuth();
  const Service = new NoteService(user);
  const [note, setNote] = useState();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TextInput
        multiline
        onChangeText={(text) => setNote(text)}
        style={{
          color: "white",
          padding: 10,
          backgroundColor: "gray",
          width: "90%",
          height: "75%",
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      <Button
        onPress={async () => {
          await Service.postNote(
            {
              notetext: note,
              isanonymus: false,
            },
            route.params.key
          );
          context.changeNoteSituation();
          navigation.goBack();
        }}
        buttonStyle={{ borderRadius: 5 }}
        size="lg"
        color="black"
      >
        Gönder
      </Button>
    </View>
  );
};

export default TakeNote;
