import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { Button } from "@rneui/themed";
import NoteService from "../../Services/noteService";
import { Context } from "../../Store/context";
import { useAuth } from "../../Store/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";
const TakeNote = ({ navigation, navigation: { setParams }, route }) => {
  const context = useContext(Context);
  const [user] = useAuth();
  const Service = new NoteService(user.token);
  const [note, setNote] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [confirmButtonColor, setConfirmButtonColor] = useState();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TextInput
        multiline
        placeholder="Not"
        placeholderTextColor="black"
        onChangeText={(text) => {
          if (text.length < 250) {
            setParams({
              saveData: (route.params.saveData = async () => {
                await Service.postNote(
                  {
                    notetext: text,
                    isanonymus: false,
                  },
                  route.params.key
                );
                context.changeNoteSituation();
                navigation.goBack();
              }),
            });
          } else {
            setAlertTitle("Hata");
            setAlertMessage("Karakter limitini aştınız");
            setConfirmButtonColor("red");
            setShowAlert(true);
          }
        }}
        style={{
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
        }}
      />
      {/* <Button
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
      </Button> */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Tamam"
        confirmButtonColor={confirmButtonColor}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
};

export default TakeNote;
