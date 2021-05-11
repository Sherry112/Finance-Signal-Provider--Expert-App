import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";

function AppDateTimePicker({ title, returnTime }) {
  const [date, setDate] = useState(new Date());
  const [timer, showTimer] = useState(false);
  const [displayTime, setDisplayTime] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (event.type == "set") {
      setDate(currentDate);
      showTimer(false);
      setDisplayTime(currentDate);
      returnTime(currentDate);
    }
    if (event.type == "dismissed") {
      showTimer(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => showTimer(true)}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            size={25}
            color={colors.medium}
            name="timer"
            style={styles.icon}
          />
          <Text style={{ color: colors.medium, fontSize: 18 }}>
            {displayTime ? displayTime.toString().split("T")[0] : title}
          </Text>
        </View>
      </TouchableOpacity>

      {timer && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={onChange}
          mode="spinner"
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: defaultStyles.text,
});
export default AppDateTimePicker;
