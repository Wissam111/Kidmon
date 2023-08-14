import React, { useCallback, useRef, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthContext } from "../../hooks/useAuthContext";
const SplashScreen = ({ navigation }) => {
  const backgroundFade = useRef(new Animated.Value(0))?.current;
  const logoFade = useRef(new Animated.Value(0))?.current;
  const logoMovement = useRef(new Animated.Value(0))?.current;
  const { dispatch } = useAuthContext();
  // const { CheckUserInStorage } = useAuthContext();

  // const isLoggedIn = route?.params?.isLoggedIn;
  // const { isLoggedIn } = navigation.state.params;

  const getData = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      const tokenJson = await AsyncStorage.getItem("token");
      return {
        user: userJson ? JSON.parse(userJson) : null,
        token: tokenJson ? JSON.parse(tokenJson) : null,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const CheckUserInStorage = async () => {
    const fetchData = async () => {
      const authData = await getData();
      if (authData?.user && authData?.token) {
        dispatch({ type: "LOGIN", payload: authData });
        navigation.navigate("HomeParent", { isLoggedIn: true });
        // navigation.navigate("Splash");
      } else {
        navigation.navigate("Entry", { isLoggedIn: false });
      }
    };
    fetchData();
  };
  useFocusEffect(
    useCallback(() => {
      Animated.timing(backgroundFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(logoMovement, {
          toValue: -50,
          duration: 2000,
          easing: Easing.inOut(Easing.exp),
          useNativeDriver: false,
        }).start(() => {
          CheckUserInStorage();
        });
      }, 250);
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={styles.container}>
        <View style={styles.loadersRow}>
          <LottieView
            source={require("../../../assets/loaders/PizzaIcon.json")}
            style={styles.loaderIcon}
            autoPlay
            loop
          />
          <LottieView
            source={require("../../../assets/loaders/BurgerIcon.json")}
            style={styles.loaderIcon}
            autoPlay
            loop
          />
          <LottieView
            source={require("../../../assets/loaders/IceCreamIcon.json")}
            style={styles.loaderIcon}
            autoPlay
            loop
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5FD5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderIcon: {
    width: 100,
    height: 100,
    margin: 5,
  },
  loadersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loaderWrapper: {
    ...Platform.select({
      android: {
        height: 150,
      },
      ios: {
        height: 80,
      },
    }),
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
  bottomWrapper: {
    width: "100%",
    height: "100%",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0.5,
    left: 0,
  },
  halfCircle: {
    width: "100%",
    backgroundColor: "#EEFBF3",
    height: "100%",
    borderRadius: 12,
  },
  img: {
    width: "60%",
    height: 100,
    resizeMode: "contain",
  },
  versionTxtWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 2,
  },
});
