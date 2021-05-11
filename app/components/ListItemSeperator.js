import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
function ListItemSeperator(props) {
  return <View style={styles.listItemSeperator} />;
}
const styles = StyleSheet.create({
  listItemSeperator: {
    width: "100%",
    height: 12,
    backgroundColor: colors.yellow,
  },
});
export default ListItemSeperator;
