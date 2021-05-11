import React from "react";
import { TouchableHighlight, StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
function ListItem({
  stockName,
  expertName,
  date,
  profitLoss,
  tradeType,
  onPress,
}) {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={colors.yellow}
      onPress={onPress}
    >
      <>
        <View style={styles.upperRow}>
          {stockName ? (
            <Text style={styles.stockStyle}>{stockName}</Text>
          ) : (
            <Text style={styles.stockStyle} />
          )}
          <Text style={styles.dateStyle}>{date}</Text>
        </View>
        <View style={styles.lowerRow}>
          <Text style={styles.expertStyle}>
            {tradeType} by{" "}
            <Text style={styles.expertNameStyle}>{expertName}</Text>
          </Text>
          <Text style={styles.profitLossStyle}>{profitLoss}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cream,
    width: "100%",
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 35,
  },
  lowerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    height: 35,
  },
  stockStyle: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 15,
    color: colors.black,
  },
  expertStyle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.grey,
    marginLeft: 10,
  },
  expertNameStyle: {
    fontSize: 16,
    fontWeight: "200",
    color: colors.green,
  },
  dateStyle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.grey,
    marginRight: 15,
  },
  profitLossStyle: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 15,
    color: colors.green,
    marginRight: 15,
  },
});
export default ListItem;
