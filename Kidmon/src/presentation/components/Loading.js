import { View, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const Loading = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        position: "absolute",
        top: 0,
        zIndex: 50,
        border: 2,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: "40%", height: "20%", zIndex: 50 }}
        source={require("../../../assets/imgs/loading1.gif")}
      />
    </Animated.View>
  );
};

export default Loading;
