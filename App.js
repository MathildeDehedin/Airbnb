import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import Components
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Aroundme from "./screens/Aroundme";
import Rooms from "./screens/Rooms";
import Room from "./components/Room";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setIsLoading(false);
      setUserToken(userToken);
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? (
        <Stack.Navigator>
          {/* option={{header : () => null}} */}
          <Stack.Screen name="Login">
            {() => <Login setId={setId} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {() => <Signup setId={setId} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Menu">
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: "black",
                    inactiveTintColor: "white",
                    style: {
                      backgroundColor: "#F1485C",
                    },
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: () => (
                        <Ionicons name={"ios-home"} size={30} color="white" />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "List",
                            tabBarLabel: "Home",
                            headerStyle: { backgroundColor: "#F1485C" },
                            headerTitleStyle: { color: "black" },
                            headerTitleAlign: "center",
                          }}
                        >
                          {() => <Home />}
                        </Stack.Screen>
                        <Stack.Screen name="Room">
                          {() => <Room />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  <Tab.Screen
                    name="Profile"
                    options={{
                      tabBarLabel: "Profile",
                      tabBarIcon: () => (
                        <Ionicons name={"ios-person"} size={30} color="white" />
                      ),
                    }}
                  >
                    {() => <Profile setId={setId} setToken={setToken} />}
                  </Tab.Screen>

                  <Tab.Screen
                    name="Aroundme"
                    options={{
                      tabBarLabel: "Around Me",
                      tabBarIcon: () => (
                        <Ionicons name={"ios-pin"} size={30} color="white" />
                      ),
                    }}
                  >
                    {() => <Aroundme setId={setId} setToken={setToken} />}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;

{
  /* <Stack.Navigator>
            <Stack.Screen name="Tab">
              {() => {
                <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: () => (
                        <Ionicons name={"ios-home"} size={24} color={black} />
                      ),
                    }}
                  >
                    {() => {
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "Home",
                            headerStyle: { backgroundColor: "#F35960" },
                            headerTitleStyle: { color: "white" },
                          }}
                        >
                          {() => <Home />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Profile"
                          options={{
                            title: "My Profile",
                            headerStyle: { backgroundColor: "#F35960" },
                            headerTitleStyle: { color: "white" },
                          }}
                        >
                          {() => <Profile />}
                        </Stack.Screen>
                      </Stack.Navigator>;
                    }}
                  </Tab.Screen>
                </Tab.Navigator>;
              }}
            </Stack.Screen>
          </Stack.Navigator> */
}
{
  /* <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Rooms" component={Rooms} />
          <Stack.Screen name="Room" component={Room} /> */
}
// </Stack.Screen>
