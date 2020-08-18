import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import ActivityIndicator from "../components/ActivityIndicator";
import MapView from "react-native-maps";

const Aroundme = () => {
  const [location, setLocation] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Please accept the location if you want to use our app");
    } else {
      const location = await Location.getCurrentPositionAsync();
      //console.log(location);
      setLocation(location);
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room/around?latitude=" +
          location.coords.latitude +
          "&longitude=" +
          location.coords.longitude
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      style={styles.mapView}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data.map((marker, index) => {
        return (
          <MapView.Marker
            key={marker._id}
            coordinate={{
              latitude: marker.loc[1],
              longitude: marker.loc[0],
            }}
          ></MapView.Marker>
        );
      })}
    </MapView>
  );
};
const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    // width: "100%",
  },
});
export default Aroundme;
