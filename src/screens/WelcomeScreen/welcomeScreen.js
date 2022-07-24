import React, { useState, useContext } from "react";
import { Text, View, ImageBackground, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const WelcomeScreen = ({ navigation }) => {
  const image = {
    uri: "/Users/sametkarakurt/Drop-Note-Mobile/assets/welcomeBackground.png",
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Button
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
          buttonStyle={styles.loginButton}
        >
          Login
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
          buttonStyle={styles.registerButton}
          titleStyle={styles.registerTitle}
        >
          Register
        </Button>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    marginTop: HEIGHT - 591,
    backgroundColor: "#1E232C",
    color: "white",
    width: WIDTH - 20,
    height: 56,
    borderRadius: 8,
  },

  registerButton: {
    backgroundColor: "rgb(211, 220, 223)",
    width: WIDTH - 20,
    height: 56,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: "1 solid",
    borderColor: "#1E232C",
  },

  registerTitle: {
    color: "black",
  },
});
export default WelcomeScreen;
