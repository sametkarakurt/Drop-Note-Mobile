import * as React from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "@rneui/themed";
function TakeNote() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TextInput
        multiline
        onChangeText={(text) => console.log(text)}
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
      <Button buttonStyle={{ borderRadius: 5 }} size="lg" color="black">
        Gönder
      </Button>
    </View>
  );
}

export default TakeNote;
