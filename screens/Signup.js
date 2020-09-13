import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Signup = ({ setToken, setId }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== passwordConfirm) {
        alert("Passwords are not identicals");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            name: name,
            description: description,
            password: password,
          }
        );
        //console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
          setId(response.data.id);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.signup}>
      <ScrollView style={styles.signup}>
        <SafeAreaView>
          <View>
            <Text style={styles.signupTitle}>Rejoignez-nous!</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="white"
              value={email}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              autoCapitalize="none"
              value={username}
              placeholder="Username"
              placeholderTextColor="white"
              style={styles.input}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              autoCapitalize="none"
              value={name}
              placeholder="Name"
              placeholderTextColor="white"
              style={styles.input}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Description"
              value={description}
              placeholderTextColor="white"
              style={styles.input}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <TextInput
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              placeholderTextColor="white"
              placeholder="Password"
              style={styles.input}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Confirm your password"
              value={passwordConfirm}
              style={styles.input}
              placeholderTextColor="white"
              onChangeText={(text) => {
                setPasswordConfirm(text);
              }}
            />
            <TouchableOpacity
              style={styles.buttonSignup}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonSignupText}> S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.connectText}>
                Déjà un compte ? Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    backgroundColor: "#F35960",
  },
  signupTitle: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  input: {
    marginTop: 20,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: 350,
    color: "white",
    marginLeft: "auto",
    paddingLeft: 5,
    marginRight: "auto",
  },
  buttonSignup: {
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
  buttonSignupText: {
    color: "#F35960",
    fontSize: 24,
  },
  connectText: {
    color: "white",
    textAlign: "center",
  },
});

export default Signup;
