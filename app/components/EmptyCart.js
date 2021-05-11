import React from "react";
import LottieView from "lottie-react-native";
function EmptyCart({ visible = false }) {
  if (!visible) return null;
  return (
    <LottieView
      autoPlay
      true
      source={require("../../assets/animation/cart_empty.json")}
    />
  );
}
export default EmptyCart;
