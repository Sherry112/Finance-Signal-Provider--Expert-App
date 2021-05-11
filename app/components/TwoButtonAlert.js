import React from "react";
import {Alert} from 'react-native'
function TwoButtonAlert({ onOkPress }) {
  return (
    <div>
      {Alert.alert(
        "Close the Trade",
        "Are you sure you want to close the trade?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => closeActiveTrade(stockNameToClose) },
        ]
      )}
    </div>
  );
}

export default TwoButtonAlert;
