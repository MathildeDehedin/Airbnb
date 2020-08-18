import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActionSheetIOS,
} from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import { TextInput } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import axios from "axios";

const Profile = ({ setToken, setId }) => {
  const [data, setData] = useState([]);
  const [imageProfile, setImageProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [upLoading, setUpLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  // OK
  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const id = await AsyncStorage.getItem("userId");
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${id}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        //console.log(response.data);
        setData(response.data);
        setImageProfile(response.data.photo[0].url);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);
  // OK
  const editUser = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    try {
      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update/${id}`,
        {
          email: email,
          description: description,
          username: username,
          name: name,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      console.log(response.data);
      setData(response.data);
      alert("Changes Updated");
      // setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      alert("Please try again");
    }
  };

  const handleImagePicked = useCallback(async (pickerResult) => {
    const id = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("userToken");
    try {
      setUpLoading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        //console.log(fileType);
        const formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        //console.log(id);
        const uploadResponse = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/${id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //console.log(uploadResponse.data.photo[0].url);
        if (
          Array.isArray(uploadResponse.data.photo) === true &&
          uploadResponse.data.photo.length > 0
        ) {
          setImageProfile(uploadResponse.data.photo[0].url);
          //setData(uploadResponse.data)
        }
      }
    } catch (e) {
      alert("Error, please try again");
    } finally {
      setUpLoading(false);
    }
  });

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Take a Picture", "Access to my library", "Cancel"],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          takeAPicture();
        }
        if (buttonIndex === 1) {
          takeLibraryImage();
        }
      }
    );

  const takeAPicture = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handleImagePicked(pickerResult);
      setImageProfile(pickerResult.uri);
    }
  };

  const takeLibraryImage = async () => {
    const cameraRollPerm = await ImagePicker.requestCameraRollPermissionsAsync();
    // only if user allows permission to camera roll
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      // console.log(pickerResult);
      handleImagePicked(pickerResult);
      setImageProfile(pickerResult.uri);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <TouchableOpacity onPress={onPress}>
        {data.photo.length === 0 && setUpLoading === false ? (
          <Image style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: imageProfile }} />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        defaultValue={data.email}
        placeholder="Email"
        placeholderTextColor="#F35960"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        defaultValue={data.username}
        placeholder="Username"
        placeholderTextColor="#F35960"
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        defaultValue={data.name}
        placeholder="Name"
        placeholderTextColor="#F35960"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.textDescription}
        autoCapitalize="none"
        defaultValue={data.description}
        placeholder="Description"
        placeholderTextColor="#F35960"
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity style={styles.updateBtn} onPress={editUser}>
        <Text style={styles.updateText}>Mettre à jour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          setToken(null);
          setId(null);
        }}
      >
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    height: 120,
    width: 120,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#F35960",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    borderBottomColor: "#F35960",
    borderBottomWidth: 1,
    height: 45,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 5,
  },
  textDescription: {
    borderWidth: 1,
    borderColor: "#F35960",
    width: "90%",
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
    textAlignVertical: "top",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 5,
  },
  updateBtn: {
    width: 150,
    height: 55,
    marginTop: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#F35960",
    backgroundColor: "#F35960",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  updateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  logoutBtn: {
    marginTop: 20,
    width: 150,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#F35960",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
export default Profile;
