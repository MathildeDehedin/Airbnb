import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Room = ({ data }) => {
  let starsTab = [];
  for (let i = 0; i < 5; i++) {
    if (i < data.ratingValue) {
      starsTab.push(
        <Ionicons key={i} name="ios-star" size={24} color="yellow" />
      );
    } else {
      starsTab.push(
        <Ionicons key={i} name="ios-star" size={24} color="grey" />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.rooms}>
        <ImageBackground
          style={styles.imgRoom}
          source={{ uri: data.photos[0] }}
        >
          <View style={styles.priceDiv}>
            <Text style={styles.priceRoom}>{data.price} €</Text>
          </View>
        </ImageBackground>

        <View style={styles.descriptionRoom}>
          <View>
            <Text style={styles.titleRoom}>{data.title}</Text>
            <View style={styles.popularityRoom}>
              <Text style={styles.ratingRoom}>{starsTab}</Text>
              <Text style={styles.reviewsRoom}>{data.reviews} avis</Text>
            </View>
          </View>
          <Image
            style={styles.imgProfile}
            source={{ uri: data.user.account.photos[0] }}
          />
        </View>
        <View style={styles.lineRooms}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // #F35960
    backgroundColor: "white",
  },
  rooms: {
    marginTop: 10,
  },
  imgRoom: {
    width: 330,
    height: 215,
    marginLeft: "auto",
    marginRight: "auto",
  },
  descriptionRoom: {
    width: 330,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRoom: {
    fontSize: 16,
    color: "black",
  },
  priceDiv: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    width: 70,
    height: 45,
    bottom: 10,
    left: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  priceRoom: {
    fontSize: 18,
    color: "white",
  },
  popularityRoom: {
    flexDirection: "row",
    marginTop: 5,
  },
  ratingRoom: {
    flexDirection: "row",
    marginRight: 10,
  },
  reviewsRoom: {
    color: "#BBBBBB",
    fontSize: 17,
  },
  imgProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  lineRooms: {
    borderWidth: 1,
    marginTop: 10,
    width: 330,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    borderColor: "#BBBBBB",
    borderStyle: "solid",
  },
});
export default Room;
