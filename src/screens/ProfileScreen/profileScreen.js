import React, { useEffect, useState, useContext } from "react";
import { Text, View, Button } from "react-native";
import { useAuth } from "../../Store/AuthContext";
import UserService from "../../Services/userService";
const ProfileScreen = () => {
  const [user, setUser] = useAuth();
  const userService = new UserService(user.token);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      await userService
        .getCurrentUser()
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{currentUser ? currentUser.nickname : "Kullanıcı yok"}</Text>
      <Text>{currentUser ? currentUser.email : null}</Text>

      <Button
        title="Çık"
        onPress={() => {
          setUser(null);
        }}
      ></Button>
    </View>
  );
};

export default ProfileScreen;
