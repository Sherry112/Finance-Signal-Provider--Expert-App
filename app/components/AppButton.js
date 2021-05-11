import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
function AppButton({ title, onPress, color }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: 200,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default AppButton;
