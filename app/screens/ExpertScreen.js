import React, { useState } from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppPicker from "../components/AppPicker";
import AppButton from "../components/AppButton";
import {
  tradeTypes,
  stocksOrOptions,
  longShortsOrCallPuts,
} from "../constants/constants";
import AppDateTimePicker from "../components/AppDateTimePicker";
import { writeUserData } from "../api/postData";
import UploadScreen from "./UploadScreen";
import { getCurrentDate } from "../utils/utils";
function ExpertScreen() {
  const [stockName, setStockName] = useState();
  const [tradeType, setTradeType] = useState();
  const [stockOrOption, setStockOrOption] = useState();
  const [longShortOrCallPut, setLongShortOrCallPut] = useState();
  const [price, setPrice] = useState();
  const [stopLoss, setStopLoss] = useState();
  const [limit, setLimit] = useState();
  const [strike, setStrike] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [uploadScreenVisible, setUploadScreenVisible] = useState(false);

  const handleSubmit = async (data) => {
    const formattedData = {
      stockName: stockName,
      tradeType: tradeType,
      stockOrOption: stockOrOption,
      longShortOrCallPut: longShortOrCallPut,
      price: price,
      stopLoss: stopLoss,
      limit: limit,
      strike: strike,
      expiryDate: expiryDate,
      date: getCurrentDate(),
    };
    try {
      setUploadScreenVisible(true);
      await writeUserData(formattedData);
    } catch (error) {
      setUploadScreenVisible(false);
      console.log(error);
      return alert("Could not Post the Data");
    }
  };
  const handleTimerCallback = (time) => {
    setExpiryDate(time);
  };
  return (
    <ScrollView>
      <Screen style={styles.container}>
        <UploadScreen
          onDone={() => {
            setStockName();
            setTradeType();
            setStockOrOption();
            setLongShortOrCallPut();
            setPrice();
            setStopLoss();
            setLimit();
            setStrike();
            setExpiryDate();
            setUploadScreenVisible(false);
          }}
          visible={uploadScreenVisible}
        />
        <Image style={styles.logo} source={require("../../assets/icon.png")} />

        <AppTextInput
          autoCapitalize="characters"
          autoComplete={false}
          icon="bank"
          placeholder="Stock Name"
          onChangeText={(text) => setStockName(text)}
          value={stockName}
        />

        <AppPicker
          items={tradeTypes}
          selectedItem={tradeType}
          onSelectItem={(item) => {
            setTradeType(item);
            setStockOrOption();
          }}
          icon="equalizer-outline"
          placeholder="Trade Type"
        />
        <AppPicker
          items={stocksOrOptions}
          selectedItem={stockOrOption}
          onSelectItem={(item) => {
            setStockOrOption(item);
            setLongShortOrCallPut();
          }}
          icon="apps"
          placeholder="Options or Stocks"
        />
        <AppPicker
          items={
            stockOrOption ? longShortsOrCallPuts[stockOrOption.value] : null
          }
          selectedItem={longShortOrCallPut}
          onSelectItem={(item) => {
            setLongShortOrCallPut(item);
          }}
          icon="equalizer-outline"
          placeholder="Select Trade Type"
        />
        <AppTextInput
          autoComplete={false}
          icon="currency-usd"
          placeholder="Price"
          onChangeText={(text) => setPrice(text)}
          keyboardType="decimal-pad"
          value={price}
        />
        <AppTextInput
          autoComplete={false}
          icon="currency-usd"
          placeholder="Limit"
          onChangeText={(text) => setLimit(text)}
          keyboardType="decimal-pad"
          value={limit}
        />
        <AppTextInput
          autoComplete={false}
          icon="currency-usd"
          placeholder="Stop Loss"
          onChangeText={(text) => setStopLoss(text)}
          keyboardType="decimal-pad"
          value={stopLoss}
        />
        {stockOrOption && stockOrOption.value == "1" ? (
          <AppTextInput
            autoComplete={false}
            icon="currency-usd"
            placeholder="Strike"
            onChangeText={(text) => setStrike(text)}
            keyboardType="decimal-pad"
            value={strike}
          />
        ) : null}

        {stockOrOption && stockOrOption.value == "1 " ? (
          <AppDateTimePicker
            title="Expiry Date"
            returnTime={handleTimerCallback}
          />
        ) : null}
        <AppButton
          title="Submit"
          color="gold"
          onPress={() => {
            handleSubmit();
          }}
        />
      </Screen>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: "100%",
    height: 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
});
export default ExpertScreen;
