import firebaseConfig from "./firebaseConfig";
import "firebase/database";
import firebase from "firebase/app";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const writeUserData = (data) => {
  console.log("DATA", data);
  const strike = data.strike ? data.strike : null;
  const expiryDate = data.expiryDate ? data.expiryDate.toString() : null;
  firebase.database().ref(data.stockName).set({
    stockName: data.stockName,
    tradeType: data.tradeType,
    stockOrOption: data.stockOrOption,
    longShortOrCallPut: data.longShortOrCallPut,
    price: data.price,
    stopLoss: data.stopLoss,
    limit: data.limit,
    strike: strike,
    expiryDate: expiryDate,
    date: data.date,
    status: true,
    result: "---",
  });
};

export const readDataFireBase = async () => {
  let stocksData = firebase.database().ref("/");
  stocksData.on("value", (snapshot) => {
    const data = snapshot.val();
    //   updateStarCount(postElement, data);
    console.log("This function is running");
    console.log(data);
  });
};

export const getActiveTrades = async () => {
  let stocksData = firebase.database().ref("/");
  stocksData.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      if (childSnapshot.hasChild("stockName")) {
        console.log(childSnapshot.child("price").val());
      }
    });
  });
};

export const closeActiveTrade = async (stockName) => {
  let stocksData = firebase.database().ref("/");
  stocksData.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      if (
        childSnapshot.hasChild("stockName") &&
        childSnapshot.child("stockName").val() === stockName
      ) {
        childSnapshot.ref.update({ status: false });
        console.log("TRADE CLOSED");
      }
    });
  });
};
