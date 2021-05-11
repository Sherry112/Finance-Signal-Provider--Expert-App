import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import PickerItem from "./PickerItem";
import Screen from "./Screen";
function AppPicker({ icon, placeholder, items, selectedItem, onSelectItem }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              size={25}
              color={colors.medium}
              name={icon}
              style={styles.icon}
            />
          )}
          <AppText style={styles.text}>
            {selectedItem ? selectedItem.label : placeholder}
          </AppText>
          <MaterialCommunityIcons
            size={20}
            color={colors.medium}
            name="chevron-down"
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
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
  text: {
    flex: 1,
  },
});
export default AppPicker;

/************************* */
// const [category, setCategory] = useState();
// const categories = [
//   {
//     label: "Furniture",
//     value: 1,
//   },
//   {
//     label: "Clothing",
//     value: 2,
//   },
//   {
//     label: "Furniture",
//     value: 3,
//   },
// ];
// <Screen>
// <AppTextInput icon="email" placeholder="Email" />
// <AppPicker
//   items={categories}
//   icon="apps"
//   placeholder="Categories"
//   selectedItem={category}
//   onSelectItem={(item) => setCategory(item)}
// />
// </Screen>
//Method to render AppPicker
