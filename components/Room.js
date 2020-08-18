import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import ActivityIndictor from "./ActivityIndicator";

const Room = () => {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room/" + params.id
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  _renderItem = ({ item, index }) => {
    return <Image style={styles.imgRoom} source={{ uri: item }} />;
  };

  return isLoading ? (
    <ActivityIndictor />
  ) : (
    <ScrollView contentContainerStyle={{ flex: 1 }} style={styles.container}>
      <View style={styles.rooms}>
        <View>
          <Carousel
            // ref={(c) => {
            //   _carousel = c;
            // }}
            data={data.photos}
            renderItem={_renderItem}
            sliderWidth={370}
            itemWidth={370}
          />

          <View style={styles.priceDiv}>
            <Text style={styles.priceRoom}>{data.price} €</Text>
          </View>
        </View>

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
      </View>
      <TouchableOpacity
        style={styles.descriptionDiv}
        onPress={() => {
          setDescription(!description);
        }}
      >
        <Text numberOfLines={description ? null : 3}>{data.description}</Text>
      </TouchableOpacity>

      <View style={styles.locationDiv}>
        <MapView
          style={styles.mapView}
          initialRegion={{
            // inversé !
            latitude: data.loc[1],
            longitude: data.loc[0],
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.loc[1],
              longitude: data.loc[0],
            }}
            title={data.title}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // #F35960
    backgroundColor: "white",
  },
  carousel: {
    marginLeft: 10,
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
    width: 340,
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
    left: 25,
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
  descriptionDiv: {
    marginTop: 30,
    width: 330,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  imgProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  locationDiv: {
    width: 330,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
    marginBottom: 30,
  },
  mapView: {
    width: "100%",
    flex: 1,
  },
});

export default Room;
