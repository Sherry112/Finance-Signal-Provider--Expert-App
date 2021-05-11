import React from "react";
import ExpertScreen from "./app/screens/ExpertScreen";
import UploadedStocksScreen from "./app/screens/UploadedStocksScreen";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./app/navigation/TabNavigation";

export default function App() {
  return (
    // <UploadedStocksScreen/>
    <NavigationContainer screenOptions= {{headerShown: false}}>
      <TabNavigation />
    </NavigationContainer>
  );
}
