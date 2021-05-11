import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import { Button, Text, FlatList, View, StyleSheet } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItem from "../components/ListItem";
import firebaseConfig from "../api/firebaseConfig";
import "firebase/database";
import firebase from "firebase/app";
import EmptyCart from "../components/EmptyCart";
import DialogueTextInput from "../components/DialogueTextInput";
import colors from "../config/colors";
function UploadedStocksScreen() {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [closingPrice, setClosingPrice] = useState();
  const [dialogueVisibility, setDialogueVisibility] = useState(false);
  const [stockToClose, setStockToClose] = useState();
  let activeTradesArr = [];

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const getActiveTrades = async () => {
    console.log("GET ACTIVE TRADE CALLED 1");
    let stocksData = firebase.database().ref("/");

    try {
      activeTradesArr = [];
      setInfo(activeTradesArr);
      setLoading(true);
      setError(false);
      stocksData.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (
            childSnapshot.hasChild("status") &&
            childSnapshot.child("status").val() === true
          ) {
            console.log("Active Trades: ", childSnapshot.val());
            activeTradesArr.push(childSnapshot.val());
            setInfo(activeTradesArr);
            setLoading(false);
            console.log(Object.keys(info).length, "LENGTH IN HEI");
          }
        });
        setLoading(false);
      });
    } catch (err) {
      console.log("Error occured", err);
      setError(true);
      setLoading(false);
    } finally {
      setInfo(activeTradesArr);
    }
  };

  const closeActiveTrade = async (stockName) => {
    console.log("CLOSS ACTIVE TRADE CALLED");
    setLoading(true);
    setError(false);
    let stocksData = firebase.database().ref("/");
    try {
      stocksData.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (
            childSnapshot.hasChild("stockName") &&
            childSnapshot.child("stockName").val() === stockName
          ) {
            childSnapshot.ref.update({ status: false });
            console.log("TRADE CLOSED");
            getActiveTrades();
            console.log(Object.keys(info).length, "LENGTH");
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log("Error occured", err);
      setError(true);
      setLoading(false);
    }
    setLoading(false);
  };

  const setResult = async (stockName, exitPrice) => {
    setLoading(true);
    setError(false);
    let stocksData = firebase.database().ref("/");
    try {
      stocksData.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (
            childSnapshot.hasChild("stockName") &&
            childSnapshot.child("stockName").val() === stockName
          ) {
            const setPrice = childSnapshot.child("price").val();
            const result = ((exitPrice - setPrice) / setPrice) * 100;

            childSnapshot.ref.update({ result: result });
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log("Error occured", err);
      setError(true);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getActiveTrades();
  }, [loading]);
  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <Text>
            Couldn't retrieve the Data. Check your Internet Connection
          </Text>
          <Button
            title="Retry"
            color="f5f7b2"
            onPress={() => setError(false)}
          ></Button>
        </>
      )}
      <ActivityIndicator visible={loading} />
      {Object.keys(info).length == 0 && !loading ? (
        <>
          <EmptyCart visible={true} />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 22,
                marginTop: 12,
                color: "red",
                fontWeight: "900",
              }}
            >
              No Active Trades
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Active Trades</Text>
          </View>
          <EmptyCart visible={false} />
        </>
      )}

      <FlatList
        data={info}
        keyExtractor={() => {
          Math.random().toString();
        }}
        ItemSeparatorComponent={ListItemSeperator}
        renderItem={({ item }) => (
          <ListItem
            stockName={item.stockName}
            expertName="Orion"
            date={item.date}
            profitLoss={item.profitLoss}
            tradeType={item.tradeType.label}
            // onPress={() => navigation.navigate("Details", { item })}
            onPress={() => {
              console.log("Button Pressed");
              setDialogueVisibility(true);
              setStockToClose(item.stockName);
            }}
          />
        )}
      />
      {dialogueVisibility ? (
        <DialogueTextInput
          visible={dialogueVisibility}
          value={closingPrice}
          keyboardType="decimal-pad"
          onChangeText={(text) => setClosingPrice(text)}
          onDone={() => {
            console.log("Done button Pressed");
            setResult(stockToClose, closingPrice);
            closeActiveTrade(stockToClose);
            setClosingPrice();
            setStockToClose();
            setDialogueVisibility(false);
          }}
          onDismiss={() => {
            setClosingPrice();
            setStockToClose();
            setDialogueVisibility(false);
          }}
        />
      ) : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  headingText: {
    color: "green",
    fontSize: 25,
    fontWeight: "500",
  },
});
export default UploadedStocksScreen;
