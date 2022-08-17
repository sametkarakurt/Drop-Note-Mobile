import React, { useState, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
const { width: WIDTH } = Dimensions.get("window");
import UserService from "../../Services/userService";
import AwesomeAlert from "react-native-awesome-alerts";
const RegisterScreen = ({ navigation }) => {
  const welcomeText = "Hello! Register to get started";
  const emailPlaceholder = "Email";
  const usernamePlaceholder = "Username";
  const passwordPlaceholder = "Password";
  const confirmPasswordPlaceholder = "Confirm password";

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, cSetPassword] = useState();

  const [showAlert, setShowAlert] = useState(false);

  const [alertTitle, setAlertTitle] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [confirmButtonColor, setConfirmButtonColor] = useState();

  const Service = new UserService();
  return (
    <SafeAreaView>
      <View styles={styles.container}>
        <Button
          buttonStyle={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.backImage}
            source={require("/Users/sametkarakurt/Drop-Note-Mobile/assets/back_arrow.png")}
          />
        </Button>
        <Text style={styles.welcomeText}>{welcomeText}</Text>
        <TextInput
          style={styles.inputEmail}
          placeholder={usernamePlaceholder}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.inputPassword}
          placeholder={emailPlaceholder}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputPassword}
          placeholder={passwordPlaceholder}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputPassword}
          placeholder={confirmPasswordPlaceholder}
          onChangeText={(text) => cSetPassword(text)}
          autoCapitalize="none"
        />

        <Button
          onPress={async () => {
            const data = {
              nickname: username,
              email: email,
              password: password,
              cpassword: cPassword,
            };
            const res = await Service.postRegisterUser(data);
            if ((res.status = 201)) {
              setAlertTitle("Succesfull");
              setAlertMessage("User Created");
              setConfirmButtonColor("green");
              setShowAlert(true);
            } else {
              setAlertTitle("Error");
              setAlertMessage("Something gone wrong");
              setConfirmButtonColor("red");
              setShowAlert(true);
            }
          }}
          containerStyle={styles.loginButtonContainer}
          buttonStyle={styles.loginButton}
        >
          Register
        </Button>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={confirmButtonColor}
          onConfirmPressed={() => {
            if (alertTitle == "Succesfull") {
              navigation.goBack();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", marginHorizontal: 22 },
  backButton: {
    width: 41,
    height: 41,
    borderColor: "#E8ECF4",
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
    marginTop: 12,
  },
  backImage: {
    width: 19,
    height: 19,
  },
  welcomeText: {
    marginTop: 28,
    marginHorizontal: 22,
    width: 300,
    height: 78,
    fontSize: 30,
    fontWeight: "bold",
  },

  loginButton: {
    backgroundColor: "#1E232C",
    color: "white",
    height: 56,
    borderRadius: 8,
  },
  loginButtonContainer: {
    marginTop: 62,
    marginHorizontal: 22,
  },
  inputEmail: {
    marginTop: 32,
    height: 56,
    backgroundColor: "#E8ECF4",
    color: "#8391A1",
    marginHorizontal: 22,
    borderRadius: 8,
    fontStyle: "normal",
    fontSize: 15,
    display: "flex",
    alignItems: "flex-end",
    padding: 18,
  },
  inputPassword: {
    height: 56,
    backgroundColor: "#E8ECF4",
    color: "#8391A1",
    marginHorizontal: 22,
    marginTop: 15,
    borderRadius: 8,

    fontStyle: "normal",
    fontSize: 15,
    display: "flex",
    alignItems: "flex-end",
    padding: 18,
  },
});
export default RegisterScreen;
