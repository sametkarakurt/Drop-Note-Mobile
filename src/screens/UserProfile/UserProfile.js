import * as React from "react";
import { Text, View, Button } from "react-native";
import { useAuth } from "../../Store/AuthContext";
const UserProfile = () => {
  const [user, setUser] = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Çık"
        onPress={() => {
          setUser(null);
        }}
      ></Button>
    </View>
  );
};

export default UserProfile;
