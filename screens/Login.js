import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      //console.log(response.data);
      if (response.data.token) {
        setToken(response.data.token);
        setId(response.data.id);
      } else {
        alert("Error, please try again");
      }
    } catch (error) {
      // console.log(error.message);
      if (error.response.status === 401) {
        alert("Wrong email-address and/or password");
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.login}>
      <SafeAreaView>
        <View>
          <Ionicons name="ios-home" style={styles.iconLogin} size={120} />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableOpacity style={styles.buttonConnect} onPress={handleSubmit}>
            <Text style={styles.buttonConnectText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.connectText}> Pas de compte ? S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#F35960",
    color: "white",
  },
  iconLogin: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
  },
  input: {
    borderBottomColor: "white",
    marginTop: 30,
    borderBottomWidth: 2,
    width: 350,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonConnect: {
    marginTop: 50,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: 170,
    height: 55,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConnectText: {
    color: "#F35960",
    fontSize: 24,
  },
  connectText: {
    color: "white",
    textAlign: "center",
  },
});
export default Login;
